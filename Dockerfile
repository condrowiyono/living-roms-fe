FROM node:lts-alpine as build
WORKDIR /app
ADD . /app/

# global install & update
RUN npm i -g npm && npm i -g yarn

RUN rm yarn.lock
RUN yarn
RUN yarn build

# start command
CMD [ "yarn", "start" ]
