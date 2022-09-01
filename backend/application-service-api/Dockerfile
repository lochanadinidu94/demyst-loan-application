FROM node:16
ENV PORT 3001

RUN mkdir -p /usr/src/app/services/application
WORKDIR /usr/src/app/services/application

COPY package.json /usr/src/app/services/application/
COPY package-lock.json /usr/src/app/services/application/

COPY prisma  /usr/src/app/services/application/.prisma
RUN npm install && npm install prisma
COPY  . .
RUN npx prisma generate

COPY . /usr/src/app/services/application
EXPOSE 3001

CMD "npm" "start"