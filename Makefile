NAME=self-koa-blog
REGISTRY=masongzhi
TAG = prod
TIME_TAG = $(shell date +%Y%m%d%H%M%S)

base:
	echo building ${NAME}-base:latest
	cp docker/base/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}-base:latest .
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}-base:latest

prod:
	echo building ${NAME}:${TAG}
	cp docker/prod/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:${TIME_TAG}
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:${TIME_TAG}
