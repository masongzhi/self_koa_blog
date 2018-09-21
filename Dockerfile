# 客户端 npm 包
FROM node:8-alpine as build
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .

RUN npm install -g yarn && yarn install

FROM node:8-alpine as prod
WORKDIR /app
COPY . .
COPY --from=build /app/node_modules ./node_modules
ENV TZ=Asia/Shanghai
CMD ["yarn", "start"]
EXPOSE 3002
