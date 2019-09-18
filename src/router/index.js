import Vue from 'vue';
import Router from 'vue-router';
import BadGateway from '@/components/BadGateway';
import MenuMaker from '@/components/MenuMaker';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/menuMaker',
      name: 'MenuMaker',
      props: { page: 1 },
      component: MenuMaker,
      alias: '/'
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: { page: 2 },
      component: BadGateway
    },
    {
      path: '*',
      props: { page: 3 },
      redirect: '/404'
    }
  ]
});
