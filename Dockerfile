FROM node:10.13.0-alpine AS build
# Create app directory
WORKDIR /app
ADD . /app/

RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
ENV PORT 5000
EXPOSE 5000

# start command
CMD [ "yarn", "start" ]