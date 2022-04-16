FROM node:17.8

COPY . /app

WORKDIR /app

ENV PORT=8081

EXPOSE 8081

RUN mkdir -p /apk/

RUN ln -s /apk/client.apk public/client.apk

RUN yarn install

ENV NODE_OPTIONS=--openssl-legacy-provider

CMD [ "npm", "start" ]
