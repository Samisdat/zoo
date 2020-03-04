FROM node:13.8.0-alpine3.10
MAINTAINER samisdat

ARG HTTP_PROXY=http://139.7.95.74:8080
ENV HTTP_PROXY ${HTTP_PROXY}
ENV HTTPS_PROXY ${HTTP_PROXY}
ENV http_proxy ${HTTP_PROXY}
ENV https_proxy ${HTTP_PROXY}

RUN npm config set proxy $HTTP_PROXY -g
RUN npm config set https-proxy $HTTP_PROXY -g

RUN apk update && \
    apk add curl tree shadow jq git

RUN mkdir /app

RUN npm install -g @loopback/cli

WORKDIR /app

CMD tail -f /dev/null

EXPOSE 8082