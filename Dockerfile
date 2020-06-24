FROM node:lts-alpine as build
WORKDIR /app
ADD . /app/

RUN yarn
RUN yarn build

# start command
CMD [ "yarn", "start" ]
