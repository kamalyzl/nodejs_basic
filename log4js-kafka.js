import debugLib from 'debug';
import { Kafka } from 'kafkajs';

const debug = debugLib('log4js:kafka');

function kafkaAppender(config, layout) {
  const kafka = new Kafka({
    clientId: config.clientId,
    brokers: config.brokers,
  });
  const { topic, shutdownTimeout = 10000 } = config;
  const messagesToSend = [];
  let promisesWaiting = 0;
  let waitingToConnect = true;
  let connection;

  const send = (messages) => {
    const rn = connection.send({
      topic,
      messages: messages.map(message => ({ value: message })),
    });
    messages.length = 0; // eslint-disable-line
    promisesWaiting += 1;
    debug(`Promises waiting: ${promisesWaiting}`);
    rn.then(() => {
      promisesWaiting -= 1;
      debug(`Promise resolved. Waiting is now: ${promisesWaiting}`);
    });
  };

  const publish = (message) => {
    if (message) {
      messagesToSend.push(message);
      debug(`Added message to buffer. Buffer length: ${messagesToSend.length}`);
    }
    if (!waitingToConnect && connection && messagesToSend.length > 0) {
      debug('Sending buffer.');
      send(messagesToSend);
    }
  };

  const closeConnection = (done) => {
    if (connection) {
      connection.disconnect().then(done);
      return;
    }
    done();
  };

  const waiting = () => waitingToConnect || promisesWaiting > 0 || messagesToSend.length > 0;

  const waitForPromises = (done) => {
    let howLongWaiting = 0;
    const checker = () => {
      debug(`waitingToConnect? ${waitingToConnect}`);
      publish();
      if (howLongWaiting >= shutdownTimeout) {
        debug(`Done waiting for promises. Waiting: ${promisesWaiting}`);
        closeConnection(done);
        return;
      }
      if (waiting()) {
        debug('Things to wait for.');
        howLongWaiting += 50;
        setTimeout(checker, 50);
      } else {
        debug('Nothing to wait for, shutdown now.');
        closeConnection(done);
      }
    };
    checker();
  };

  (async (producer) => {
    try {
      await producer.connect();
      connection = producer;
      waitingToConnect = false;
      debug('Connected.');
      publish();
    } catch (e) {
      debug('connect failed.');
      waitingToConnect = false;
      console.error(e);
    }
  })(kafka.producer());

  const appender = loggingEvent => publish(layout(loggingEvent));

  appender.shutdown = (done) => {
    debug('Appender shutdown.');
    debug(`waitingToConnect: ${waitingToConnect},
      messagesToSend: ${messagesToSend},
      promisesWaiting: ${promisesWaiting}`);
    waitForPromises(done);
  };

  return appender;
}

// eslint-disable-next-line import/prefer-default-export
export function configure(config, layouts) {
  let layout = layouts.messagePassThroughLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }

  return kafkaAppender(config, layout);
}
