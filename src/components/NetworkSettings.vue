<template>
<section id="profile">
  <div class="locked">
    <mdb-card class="lockedMessage mb-4">
      <mdb-card-header>

        Feature Unavailable

      </mdb-card-header>
      <mdb-card-body class="d-sm-flex">
        <mdb-col>
          <h4>

            DUBI PRO
            <mdb-icon icon="lock" />

          </h4>

        </mdb-col>
      </mdb-card-body>
    </mdb-card>
  </div>
  <mdb-card class="mb-4">
    <mdb-card-body class="d-sm-flex justify-content-between">
      <img src="../assets/greenleaf-logo.png" height='50'>
      <mdb-btn outline="blue" tag="a" href="#" target="_blank">SAVE
        <mdb-icon icon="save" class="ml-2" />
      </mdb-btn>
    </mdb-card-body>
  </mdb-card>
  <mdb-col md="12">
    <mdb-card cascade narrow>
      <mdb-card-body>
        <mdb-card-title class="font-bold mb-2 text-center">
          <p>NETWORK SETTINGS</p>
        </mdb-card-title>
        <h5 class="indigo-text">
          <strong>BioTrack Server:</strong>
        </h5>

        <div class="md-form">
          <mdb-input label="BioTrack Server IP Address" v-model="bioTrackIpAddress" />
          <mdb-input label="BioTrack Server Port" v-model="bioTrackPort" />
          <mdb-input label="Username" v-model="bioTrackPort" />
          <mdb-input label="Password" v-model="bioTrackPort" />
        </div>
        <h5 class="indigo-text">
          <strong>DUBI Box:</strong>
        </h5>

        <div class="md-form">
          <mdb-input label="DUBI Box IP Address" v-model="dubiBoxIpAddress" />
          <mdb-input label="DUBI Box Port" v-model="dubiBoxPort" />
          <mdb-input label="License Key" v-model="licenseKey" />

        </div>


      </mdb-card-body>
    </mdb-card>
  </mdb-col>

</section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardHeader,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbIcon,
  mdbBtn,
  mdbPageItem,
  mdbInput
} from 'mdbvue'

export default {
  name: 'NetworkSettings',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardHeader,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbIcon,
    mdbBtn,
    mdbPageItem,
    mdbInput
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

.locked {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.lockedMessage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
