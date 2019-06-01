
install: snap
	cd snapcraft && snap install --dangerous polonium_* && cd ..

snap: FORCE
	cd snapcraft && snapcraft clean && snapcraft snap && cd ..

FORCE:
