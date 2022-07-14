FROM node:14.20-alpine3.15

ARG USER=strapi
ENV HOME /home/$USER

RUN apk update && apk upgrade

RUN apk add --no-cache sudo
RUN apk add --no-cache tree
RUN apk add --no-cache python3
RUN apk add --no-cache sqlite
#RUN apk add --no-cache sqlite-dev

# add new user
RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

#USER $USER
WORKDIR $HOME

COPY --chown=strapi . .
RUN tree
RUN node --version
RUN cat package.json
RUN yarn add sqlite3
RUN yarn install
RUN yarn run build


EXPOSE 1338

CMD ["npm","start"]
