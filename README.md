# fate

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Docker Setup

Run

```
sudo docker-compose -f docker-compose-dev.yml up
```

to get the development build up & running.

For those running this for the first time make sure to create
the CouchDB databases with (once the couchdb instance has started):

```
./create_dbs.sh
```
