VERSION = latest
IMAGE = hreid3000/alpine-mongo:$(VERSION)

build:
	docker-compose up --build -d
	@make start

stop:
	docker stop cltfevents_mongodb

start:
	docker start cltfevents_mongodb

cmd:
	docker exec -it cltfevents_mongodb sh

mongo:
	docker exec -it cltfevents_mongodb mongo

#image:
#	docker build -t $(IMAGE) --no-cache .

#publish:
#	docker push $(IMAGE)