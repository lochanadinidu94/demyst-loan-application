FROM node:16-alpine
ENV NODE_ENV development
ENV PORT 2999

RUN mkdir -p /usr/src/app/ui
WORKDIR /usr/src/app/ui
COPY ./ ./frontend/
RUN cd frontend && npm install
WORKDIR /usr/src/app/ui/frontend/

CMD [ "npm", "start" ]

EXPOSE 2999