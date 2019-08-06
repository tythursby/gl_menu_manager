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

  <mdb-row>
    <mdb-col md="6" lg='3'>
      <mdb-card cascade>
        <mdb-card-header class="font-bold mb-2">
          APP LANDING PAGE IMAGE
        </mdb-card-header>
        <mdb-card-body class="text-center">
          <mdb-file-input sm btnColor="primary" />
        </mdb-card-body>
      </mdb-card>
      <hr />
      <mdb-card cascade narrow>
        <mdb-card-header class="font-bold mb-2">
          DISPENSER LOGO
        </mdb-card-header>
        <mdb-card-body class="text-center">
          <mdb-file-input sm btnColor="primary" />
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
    <mdb-col md="6" lg='3'>
      <mdb-card cascade>
        <mdb-card-header class="font-bold mb-2">
          DISPENSARY NAME
        </mdb-card-header>
        <mdb-card-body class="text-center">

          <h5 class="indigo-text">
            <strong>{{ dispenserName }}</strong>
          </h5>

          <mdb-input label="Edit Name" v-model="dispenserName" />

          <div class="text-right">
            <mdb-btn outline="primary" rounded size="sm">SAVE</mdb-btn>
          </div>
        </mdb-card-body>
      </mdb-card>
      <hr />
      <mdb-card cascade>
        <mdb-card-header class="font-bold mb-2">
          DISPENSARY PHONE #
        </mdb-card-header>
        <mdb-card-body class="text-center">

          <h5 class="indigo-text">
            <strong>{{ dispenserPhone }}</strong>
          </h5>

          <mdb-input label="Edit Phone #" v-model="dispenserPhone" />

          <div class="text-right">
            <mdb-btn outline="primary" rounded size="sm">SAVE</mdb-btn>
          </div>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
    <mdb-col md="6" lg='3'>
      <mdb-card cascade>
        <mdb-card-header class="font-bold mb-2">
          PRIMARY BRAND COLOR
        </mdb-card-header>
        <mdb-card-body class="text-center">
          <mdb-btn outline='default' rounded size='sm'>Color Picker</mdb-btn>
        </mdb-card-body>
      </mdb-card>
      <hr />
      <mdb-card cascade>
        <mdb-card-header class="font-bold mb-2">
          SECONDARY BRAND COLOR
        </mdb-card-header>
        <mdb-card-body class="text-center">
          <mdb-btn outline='default' rounded size='sm'>Color Picker</mdb-btn>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
    <mdb-col md="6" lg='3'>
      <mdb-card cascasde>
        <mdb-card-header>DISPENSARY ADDRESS</mdb-card-header>
        <mdb-card-body>
          <div class="md-form">
            <input type="text" id="form1" class="form-control" placeholder="Address Line 1">
            <input type="text" id="form2" class="form-control" placeholder="Address Line 2">
            <input type="text" id="form3" class="form-control" placeholder="City">
            <input type="text" id="form4" class="form-control" placeholder="State">
            <input type="text" id="form5" class="form-control" placeholder="Zip">
            <input type="text" id="form5" class="form-control" placeholder="Longitude">
            <input type="text" id="form5" class="form-control" placeholder="Latitude">

          </div>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>


  </mdb-row>
</section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardHeader,
  mdbCardBody,
  mdbView,
  mdbMask,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbIcon,
  mdbBtn,
  mdbFileInput,
  mdbInput
} from 'mdbvue'

export default {
  name: 'Profile',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardHeader,
    mdbCardBody,
    mdbView,
    mdbMask,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbIcon,
    mdbBtn,
    mdbFileInput,
    mdbInput

  },
  data() {
    return {
      dispenserName: '',
      dispenserPhone: ''
    }
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
