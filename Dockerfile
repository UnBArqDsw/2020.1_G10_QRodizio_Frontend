# node 12 is a LTS version
FROM node:12

RUN mkdir /app
COPY . /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

EXPOSE 8080
