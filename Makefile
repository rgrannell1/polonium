
NODE           = node
DOCKER         = docker
CONTAINER_NAME = rpgen

ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json

TEST_INSTALL_CONTAINER = $(CONTAINER_NAME)-test-install





docker-test-install-build:
	$(DOCKER) build --tag=$(TEST_INSTALL_CONTAINER) -f dockerfiles/test-install .

docker-test-install-cleanbuild:
	$(DOCKER) build --no-cache=true --tag=$(TEST_INSTALL_CONTAINER) -f dockerfiles/test-install .

docker-test-install-run:
	$(DOCKER) run $(TEST_INSTALL_CONTAINER)





eslint:
	$(ESLINT) $(ESLINT_FLAGS) lib
