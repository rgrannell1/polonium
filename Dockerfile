
FROM ubuntu:15.10

RUN apt-get update && apt-get install -y \
	npm                                  \
	curl                                 \
	git                                  \
	build-essential &&                   \
	rm -rf /var/lib/apt/lists/*





RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm cache clean -f
RUN npm install --global \
	n





RUN n 5.8.0





COPY . /src

WORKDIR /src
RUN npm link && npm install --global --only=dev

CMD ["bash", "test/install-test.sh"]
