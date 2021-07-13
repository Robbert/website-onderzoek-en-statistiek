FROM strapi/base

RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt stretch-pgdg main" > /etc/apt/sources.list.d/pgdg.list' &&\
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - &&\
    apt-get update && apt-get -y install postgresql-13

WORKDIR /srv/cms

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN export NODE_OPTIONS="--max-old-space-size=8192" && yarn build --no-optimization --clean 

EXPOSE 1337

CMD ["yarn", "start"]
