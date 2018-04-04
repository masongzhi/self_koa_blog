FROM node:8-alpine

WORKDIR /app
COPY package.json .
RUN echo http://mirrors.aliyun.com/alpine/v3.4/main/ > /etc/apk/repositories && \
        echo http://mirrors.aliyun.com/alpine/v3.4/community/ >> /etc/apk/repositories
RUN apk add --no-cache curl make gcc g++ python libgcc libstdc++ git && \
        npm install node-gyp -g --registry=https://registry.npm.taobao.org --build-from-source --disturl=https://npm.taobao.org/mirrors/node && \
    npm install --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/mirrors/node --build-from-source
RUN apk update && apk add ca-certificates && \
      apk add -U tzdata && \
      cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
      echo "Asia/Shanghai" > /etc/timezone
ENV TZ=Asia/Shanghai
