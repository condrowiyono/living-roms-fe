FROM node:lts-alpine as build
WORKDIR /app
ADD . /app/

RUN yarn
RUN yarn build

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start command
CMD [ "yarn", "start" ]
