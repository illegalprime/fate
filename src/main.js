// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VuePouch from 'vue-pouch'
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import PouchDBLiveFind from 'pouchdb-live-find'

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBLiveFind);
Vue.use(VuePouch, {
  pouch: PouchDB,
  defaultDB: 'fate',
});

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
