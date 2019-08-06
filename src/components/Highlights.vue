<template>
<section id="profile">

  <mdb-card class="mb-4">
    <mdb-card-body class="d-sm-flex justify-content-between">
      <img src="../assets/greenleaf-logo.png" height='50'>
      <mdb-btn outline="blue" tag="a" href="#" target="_blank">PUSH TO CLOUD
        <mdb-icon icon="cloud" class="ml-2" />
      </mdb-btn>
    </mdb-card-body>
  </mdb-card>


</section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbView,
  mdbMask,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbIcon,
  mdbBtn,
  mdbPagination,
  mdbPageNav,
  mdbPageItem
} from 'mdbvue'

export default {
  name: 'Highlights',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbView,
    mdbMask,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbIcon,
    mdbBtn,
    mdbPagination,
    mdbPageNav,
    mdbPageItem
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}

.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
