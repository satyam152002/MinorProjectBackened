FROM node:slim
WORKDIR /app
COPY . .
EXPOSE 8080
RUN npm install
ENTRYPOINT ["npm","run","start"]