# Run from Node 10
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=prod

# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

ENTRYPOINT npm start