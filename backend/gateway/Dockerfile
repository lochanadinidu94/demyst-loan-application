FROM node:16
ENV PORT 3000

RUN mkdir -p /usr/src/app/gateway
WORKDIR /usr/src/app/gateway

COPY package.json /usr/src/app/gateway/
RUN npm install

COPY . /usr/src/app/gateway
EXPOSE 3000

CMD "npm" "start"