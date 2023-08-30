FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./
# COPY . .
COPY src ./src/
COPY public ./public/
COPY .babelrc ./

# Create app directory


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)


RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

EXPOSE 4501
CMD [ "npm", "start" ]