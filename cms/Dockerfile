FROM strapi/base

WORKDIR /srv/cms

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN export NODE_OPTIONS="--max-old-space-size=8192" && yarn build --no-optimization --clean 

EXPOSE 1337

CMD ["yarn", "start"]