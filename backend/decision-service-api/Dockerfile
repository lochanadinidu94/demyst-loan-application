FROM node:16-alpine
ENV PORT 3004

RUN mkdir -p /usr/src/app/decision
WORKDIR /usr/src/app/decision

COPY ./ /usr/src/app/decision/
RUN npm install

EXPOSE 3004

CMD ["npm", "start"]