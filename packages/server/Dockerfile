FROM node:18.14.2
ENV NODE_ENV=development

WORKDIR /app

COPY ./mount/package*.json ./
RUN npm install
COPY mount/ ./


CMD ["npm", "run", "watch"]