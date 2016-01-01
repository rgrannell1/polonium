
FROM ubuntu:15.10

RUN apt-get update && apt-get install -y \
	npm \
	curl \
	git \
	build-essential && \
	rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm cache clean -f
RUN npm install -g \
	n





RUN n stable





COPY . /src

WORKDIR /src
RUN npm install -g

EXPOSE 8025

CMD ["bash", "test/install-test.sh"]
