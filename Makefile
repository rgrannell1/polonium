
DOCKER         = docker
CONTAINER_NAME = polonium

ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json





docker-build:
	$(DOCKER) build --tag=$(CONTAINER_NAME) .

docker-cleanbuild:
	$(DOCKER) build --no-cache=true --tag=$(CONTAINER_NAME) .

docker-run:
	$(DOCKER) run $(CONTAINER_NAME)

eslint:
	$(ESLINT) $(ESLINT_FLAGS) lib
