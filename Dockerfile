FROM node:10.13.0-alpine AS build
WORKDIR /app
ADD . /app/

RUN yarn
RUN yarn build

FROM node:10.13.0-alpine

WORKDIR /app

COPY --from=build /app/package.json package.json
COPY --from=build /app/yarn.lock yarn.lock
COPY --from=build /app/nuxt.config.js nuxt.config.js
COPY --from=build /app/.nuxt .nuxt
COPY --from=build /app/server server
COPY --from=build /app/.env .env

RUN yarn install --production

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

CMD ["node", "server/index.js"]
