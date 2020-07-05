FROM node:13.8.0-alpine3.10

MAINTAINER samisdat

RUN apk update && apk add curl tree shadow jq git

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install --verbose

COPY --chown=node . .

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD tail -f /dev/null
