FROM ubuntu
ENV DEBIAN_FRONTEND noninteractive

# install node and yarn
RUN apt-get update
RUN apt-get -y install curl gnupg2 wget
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs
RUN npm install --global yarn

# install postgres-client with pg_dump
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt stretch-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --no-check-certificate --quiet -O - http://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get install -y postgresql-client-14

WORKDIR /srv/cms

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN export NODE_OPTIONS="--max-old-space-size=8192" && yarn build

EXPOSE 1337

CMD ["yarn", "start"]
