FROM node:16-alpine
ENV PORT 3003

RUN mkdir -p /usr/src/app/accounting
WORKDIR /usr/src/app/accounting

COPY ./ /usr/src/app/accounting/
RUN npm install

EXPOSE 3003

CMD ["npm", "start"]