VERSION = latest
IMAGE = hreid3000/alpine-mongo:$(VERSION)

build:
	docker-compose up --build -d

mongo_stop:
	docker stop cltfevents_mongodb

mongo_start:
	docker start cltfevents_mongodb

mongo_cmd:
	docker exec -it cltfevents_mongodb sh

mongo_shell:
	docker exec -it cltfevents_mongodb mongo

#image:
#	docker build -t $(IMAGE) --no-cache .

#publish:
#	docker push $(IMAGE)