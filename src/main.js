// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css';
import Crop from './components/CropComponent';

Vue.use(VueCroppie);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Crop },
  template: '<App/>'

});
