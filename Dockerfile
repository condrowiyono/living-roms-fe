FROM node:lts-alpine as build
WORKDIR /app

ADD . .
RUN yarn install
RUN yarn build

FROM node:lts-alpine 
WORKDIR /app

COPY --from=build /app/package.json package.json
COPY --from=build /app/yarn.lock yarn.lock
COPY --from=build /app/nuxt.config.js nuxt.config.js
COPY --from=build /app/.nuxt .nuxt
COPY --from=build /app/.env .env

RUN yarn install --production

ENV NODE_ENV="production"

CMD ["yarn", "start"]