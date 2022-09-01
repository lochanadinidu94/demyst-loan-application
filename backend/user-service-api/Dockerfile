FROM node:14-alpine
ENV PORT 3002

RUN mkdir -p /usr/src/app/user
WORKDIR /usr/src/app/user

COPY ./ /usr/src/app/user/
COPY prisma  /usr/src/app/services/user/.prisma
RUN npm install && npm install prisma
COPY  . .
RUN npx prisma generate

EXPOSE 3002

CMD ["npm", "start"]