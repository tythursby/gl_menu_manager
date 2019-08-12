import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Profile from '@/components/Profile';
import BadGateway from '@/components/BadGateway';
import MenuMaker from '@/components/MenuMaker';
import Push from '@/components/Push';
import Highlights from '@/components/Highlights';
import Hours from '@/components/Hours';
import NetworkSettings from '@/components/NetworkSettings';

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
      path: '/push',
      name: 'Push',
      props: { page: 2 },
      component: Push
    },
    {
      path: '/highlights',
      name: 'Highlights',
      props: { page: 3 },
      component: Highlights
    },
    {
      path: '/hours',
      name: 'Hours',
      props: { page: 4 },
      component: Hours
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: { page: 5 },
    },
    {
      path: '/profile',
      name: 'Profile',
      props: { page: 6 },
      component: Profile
    },
    {
      path: '/networkSettings',
      name: 'NetworkSettings',
      props: { page: 7 },
      component: NetworkSettings
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: { page: 8 },
      component: BadGateway
    },
    {
      path: '*',
      props: { page: 8 },
      redirect: '/404'
    }
  ]
});
