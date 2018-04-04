NAME=self-koa-blog
REGISTRY=masongzhi
TAG = $(shell date +%Y%m%d%H%M%S)
FIXTAG=beta

base:
	echo building ${NAME}-base:latest
	cp docker/base/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}-base:latest .
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}-base:latest

build:base
	echo building ${NAME}:${TAG}
	cp docker/prod/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:${FIXTAG}
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}:${TAG}
	docker push ${REGISTRY}/${NAME}:${FIXTAG}

buildNoFix:base
	echo building ${NAME}:${TAG}
	cp docker/prod/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}:${TAG}

autobuild:
	echo building ${NAME}:${FIXTAG}
	cp docker/prod/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${FIXTAG} .
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}:${FIXTAG}
