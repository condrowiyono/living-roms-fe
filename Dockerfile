FROM node:10.13.0-alpine AS build
# Create app directory
WORKDIR /app
ADD . /app/

RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
ENV PORT 3000
EXPOSE 3000

# start command
CMD [ "yarn", "start" ]