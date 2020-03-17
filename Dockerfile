FROM node

RUN mkdir /service

WORKDIR /service

COPY  package.json \
  app.js \
  ./
COPY public ./public
COPY routes ./routes
COPY bin ./bin
COPY views ./views

RUN mkdir uploads

RUN yarn install

EXPOSE 3000

CMD ["yarn","run", "start"]