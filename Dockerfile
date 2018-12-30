FROM node:11.5-alpine

RUN mkdir -p /usr/src/as-customer

WORKDIR /usr/src/as-customer

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

CMD yarn run serve
