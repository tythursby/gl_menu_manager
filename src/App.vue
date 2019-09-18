<template>
<div class="flexible-content">
  <!--Navbar-->
  <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
    <mdb-navbar-brand>ADMIN</mdb-navbar-brand>
    <mdb-navbar-toggler>
      <!-- <mdb-navbar-nav left>

        <mdb-nav-item href="#" waves-fixed>Terms/Conditions</mdb-nav-item>
        <mdb-nav-item href="#" waves-fixed>Help <i class="far fa-question-circle"></i></mdb-nav-item>

      </mdb-navbar-nav> -->
      <mdb-navbar-nav right>

        <!-- <mdb-nav-item href="#" waves-fixed class="border border-light rounded mr-1" target="_blank">
          <mdb-icon icon="tools" class="mr-2" />Account Settings </mdb-nav-item> -->
        <mdb-nav-item href="#" waves-fixed class="border border-light rounded" target="_blank">
          <mdb-icon icon="user" far class="mr-2" />Log Out </mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
  <!--/.Navbar-->
  <!-- Sidebar -->
  <div class="sidebar-fixed position-fixed">
    <!-- <a class="logo-wrapper"><img alt="" class="img-fluid" src="./assets/DUBI.png" /></a> -->
    <img src="./assets/greenleaf-logo.png" height='50' style='margin-top: 40px; margin-bottom: 40px;'>
    <mdb-list-group class="list-group-flush">

      <router-link to="/menuMaker" @click.native="activeItem = 1">
        <mdb-list-group-item :action="true" :class="activeItem === 1 && 'active'">
          <mdb-icon icon="cannabis" class="mr-3" />Menu Manager</mdb-list-group-item>
      </router-link>
      <!-- <router-link to="/push" @click.native="activeItem = 2">
        <mdb-list-group-item :action="true" :class="activeItem === 2 && 'active'">
          <mdb-icon icon="paper-plane" class="mr-3" />Push Notifications</mdb-list-group-item>
      </router-link>
      <router-link to="/highlights" @click.native="activeItem = 3">
        <mdb-list-group-item :action="true" :class="activeItem === 3 && 'active'">
          <mdb-icon icon="star" class="mr-3" />Daily Special</mdb-list-group-item>
      </router-link>
      <router-link to="/hours" @click.native="activeItem = 4">
        <mdb-list-group-item :action="true" :class="activeItem === 4 && 'active'">
          <mdb-icon icon="clock" class="mr-3" />Hours of Operation</mdb-list-group-item>
      </router-link> -->
      <!-- <router-link to="/dashboard" @click.native="activeItem = 5">
        <mdb-list-group-item :action="true" :class="activeItem === 5 && 'active'">
          <mdb-icon icon="chart-pie" class="mr-3" />Dashboard</mdb-list-group-item>
      </router-link>
      <router-link to="/profile" @click.native="activeItem = 6">
        <mdb-list-group-item :action="true" :class="activeItem === 6 && 'active'">
          <mdb-icon icon="user" class="mr-3" />Profile</mdb-list-group-item>
      </router-link>
      <router-link to="/networkSettings" @click.native="activeItem = 7">
        <mdb-list-group-item :action="true" :class="activeItem === 7 && 'active'">
          <mdb-icon icon="network-wired" class="mr-3" />Network Settings</mdb-list-group-item>
      </router-link> -->
    </mdb-list-group>
  </div>
  <!-- /Sidebar  -->
  <main>
    <div class="mt-5 p-5">
      <router-view></router-view>
    </div>
    <!-- <ftr color="primary-color-dark" class="text-center font-small darken-2">
      <div class="pt-4">
        <mdb-btn outline="white" tag="a" href="#" target="_blank" disabled>GET DUBI PRO
          <mdb-icon icon="unlock" class="ml-2" />
        </mdb-btn>
      </div>
      <hr class="my4" />
      <div class="pb-4">
        <mdb-btn floating size='sm' gradient='blue' tag="a" href="#" target="_blank" disabled>
          <mdb-icon fab icon="facebook-square" class="mr-3" />
        </mdb-btn>
        <mdb-btn floating size='sm' gradient='blue' tag="a" href="#" target="_blank" disabled>
          <mdb-icon fas icon="globe" class="mr-3" />
        </mdb-btn>
        <mdb-btn floating size='sm' gradient='blue' tag="a" href="#" target="_blank" disabled>
          <mdb-icon fab icon="github" class="mr-3" />
        </mdb-btn>

      </div>
      <p class="footer-copyright mb-0 py-3 text-center">
        &copy; {{new Date().getFullYear()}} Copyright DUBI.cloud
      </p>
    </ftr> -->
  </main>
</div>
</template>

<script>
import {
  mdbContainer,
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbBtn,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  mdbCardBody,
  mdbFooter,
  waves
} from 'mdbvue'
import MenuMaker from './components/MenuMaker';

export default {
  name: 'AdminTemplate',
  components: {
    mdbContainer,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn,
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon,
    mdbCardBody,
    'ftr': mdbFooter,
    MenuMaker,

  },
  data() {
    return {
      activeItem: 1
    }
  },
  beforeMount() {
    this.activeItem = this.$route.matched[0].props.default.page
  },
  mixins: [waves]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  background-color: #EDEDEE;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }

  .flexible-content {
    padding-left: 0;
  }

  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
<style>
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>
