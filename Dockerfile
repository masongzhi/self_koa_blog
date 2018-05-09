# 客户端 npm 包
FROM node:8-alpine as build
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --build-from-source --registry=https://registry.npm.taobao.org \
    --disturl=https://npm.taobao.org/mirrors/node && \
    npm cache verify

FROM node:8-alpine as prod
WORKDIR /app
COPY . .
COPY --from=build /app/node_modules ./node_modules
ENV TZ=Asia/Shanghai
CMD ["npm", "start"]
EXPOSE 3002
