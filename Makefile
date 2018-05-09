NAME=self-koa-blog
REGISTRY=masongzhi
TAG = prod
TIME_TAG = $(shell date +%Y%m%d%H%M%S)

prod:
	echo building ${NAME}:${TAG}
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:${TIME_TAG}
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:${TIME_TAG}
