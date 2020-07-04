FROM node:10.13.0-alpine AS build
WORKDIR /app
ADD . /app/

RUN yarn
RUN yarn build

CMD ["yarn", "start"]
