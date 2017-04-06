
NODE           = node
CONTAINER_NAME = polonium

ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json





eslint:
	$(ESLINT) $(ESLINT_FLAGS) lib

install: snap
	cd snapcraft && snap install polonium_* && cd ..

snap: FORCE
	cd snapcraft && snapcraft clean && snapcraft snap && cd ..

FORCE:
