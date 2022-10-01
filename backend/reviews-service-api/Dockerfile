FROM node:16-alpine
ENV PORT 3004

RUN mkdir -p /usr/src/app/reviews
WORKDIR /usr/src/app/reviews

COPY ./ /usr/src/app/reviews/
RUN npm install

EXPOSE 3005

CMD ["npm", "start"]