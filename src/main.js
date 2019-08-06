// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'places'
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

});
