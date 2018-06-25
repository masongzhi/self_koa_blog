# self_koa_blog
personal blog backend by koa2

to run this appliation, you can install and run [font-end appliation](https://github.com/masongzhi/blog)

# installation
```bash
# install
npm install

# development
npm run dev

# production
npm run start

# push docker image
make prod

##### docker deploy

# start mongo
docker run --name mongo-3.4 -p 27017:27017 -d mongo:3.4

# start redis
docker run --name redis -p 6379:6379 -d redis

# start appliation
docker run --name self-koa-blog  -p 3002:3002 --link mongo-3.4:mongo --link redis:redis --env NODE_ENV=production --env "NEW_KOALA_URL=mongodb://mongo:27017/blog" --env REDIS_HOST=redis --env REDIS_PORT=6379 -d masongzhi/self-koa-blog:prod

```
