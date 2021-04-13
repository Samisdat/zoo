FROM strapi/base:12-alpine

MAINTAINER samisdat <bastian@pertz.eu>

RUN mkdir /zoo-backend
RUN chown node:node /zoo-backend

RUN npm install -g strapi@3.5.4

USER node

WORKDIR /zoo-backend

COPY --chown=node package.json package.json
RUN npm install --verbose

COPY --chown=node .tmp/ .tmp/
COPY --chown=node api/ api/
COPY --chown=node config/ config/
COPY --chown=node extensions/ extensions/
COPY --chown=node public/ public/
COPY --chown=node .env.example .env.example
COPY --chown=node .strapi-updater.json .strapi-updater.json
COPY --chown=node favicon.ico favicon.ico
COPY --chown=node README.md README.md

RUN npm run build

CMD ["npm", "run", "develop"]
