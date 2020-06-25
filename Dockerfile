FROM node:10.13.0-alpine AS build
WORKDIR /app
ADD . /app/

RUN yarn
RUN yarn build
RUN yarn

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

CMD ["node", "server/index.js"]
