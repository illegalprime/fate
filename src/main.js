// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VuePouch from 'vue-pouch'
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import PouchDBLiveFind from 'pouchdb-live-find'
import VueTextareaAutosize from 'vue-textarea-autosize'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons'
import { faGalacticSenate } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faDiceD6);
library.add(faGalacticSenate);

Vue.component('font-awesome-icon', FontAwesomeIcon)


PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBLiveFind);
Vue.use(VuePouch, {
  pouch: PouchDB,
  defaultDB: 'fatedb',
});

Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
