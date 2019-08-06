<template>
<section id="profile">

  <mdb-card class="mb-4">
    <mdb-card-body class="d-sm-flex justify-content-between">
      <img src="../assets/greenleaf-logo.png" height='50'>
      <mdb-btn outline="blue" tag="a" href="#" target="_blank">QUEUE PUSH
        <mdb-icon icon="paper-plane" class="ml-2" />
      </mdb-btn>
    </mdb-card-body>
  </mdb-card>

  <mdb-row>
    <mdb-col lg="8" class="mb-4">

      <mdb-card>
        <mdb-card-header><i class="far fa-paper-plane"></i> NEW PUSH NOTIFICATION</mdb-card-header>
        <mdb-card-body>
          <mdb-input label="Title:" v-model="value" />
          <mdb-input type='textarea' label="Message Body:" v-model="valueBody" />
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
    <mdb-col lg="4" class="mb-4">

      <mdb-card>
        <mdb-card-header><i class="far fa-calendar"></i> SCHEDULE PUSH</mdb-card-header>
        <mdb-card-body>

          <mdb-row>
            <mdb-col col="6">
              <mdb-time-picker id="timePickerOne" placeholder="Please Select" label="Time" v-model="timePush" />
            </mdb-col>
            <mdb-col col="6">
              <mdb-date-picker placeholder="Please Select" label="Date" v-model="datePush" />
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
  <mdb-row>
    <mdb-col lg="12" class="mb-4">

      <mdb-card>
        <mdb-card-header><i class="far fa-paper-plane"></i> QUEUE HISTORY</mdb-card-header>
        <mdb-card-body>

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
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbIcon,
  mdbBtn,
  mdbPageItem,
  mdbCardHeader,
  mdbInput,
  mdbDatePicker,
  mdbTimePicker,
  mdbTabs,
  mdbTabItem
} from 'mdbvue'

export default {
  name: 'Push',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbIcon,
    mdbBtn,
    mdbPageItem,
    mdbCardHeader,
    mdbInput,
    mdbDatePicker,
    mdbTimePicker,
    mdbTabs,
    mdbTabItem
  },
  data() {
    return {
      date: ''
    };
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
