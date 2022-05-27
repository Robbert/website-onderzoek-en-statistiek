FROM node:16

RUN apt-get update && apt-get install -y libvips-dev postgresql-client

RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update && apt-get -y install postgresql-client-14

WORKDIR /srv/cms

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN export NODE_OPTIONS="--max-old-space-size=8192" && yarn build

EXPOSE 1337

CMD ["yarn", "start"]
