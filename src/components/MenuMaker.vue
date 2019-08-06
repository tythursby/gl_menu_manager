<template>
<section id="profile">

  <mdb-card class="mb-4">
    <mdb-card-body class="d-sm-flex justify-content-between">
      <img src="../assets/greenleaf-logo.png" height='50'>
      <mdb-btn outline="blue" tag="a" href="#" darkWaves>PUSH TO CLOUD
        <mdb-icon icon="cloud" class="ml-2" />
      </mdb-btn>
    </mdb-card-body>
  </mdb-card>
  <mdb-row>

    <mdb-col lg="12" md="12" class="mb-r">
      <mdb-card>
        <mdb-card-header class="font-bold mb-2">
          Edit
        </mdb-card-header>
        <mdb-card-body class="text-center">
          <mdb-row>
            <mdb-col lg="3" md="6" class="mb-r">
              <mdb-select v-model="locations" />
              <mdb-select @getValue="getSelectedCategory" :options="categories" />

            </mdb-col>
            <mdb-col lg="3" md="6" class="mb-r">
              <mdb-container>
                <mdb-select multiple selectAll @getValue="getHiddenValues" :options="hidden" label="Hide Categories" />
              </mdb-container>
            </mdb-col>
            <mdb-col lg="3" md="6" class="mb-r">
              <mdb-container class='alignLeft'>
                <p class="label">Category Order</p>
                <mdb-input type="checkbox" id="alphabetical" name="arrange_alpha" v-model="alpha" label="Arrange Alphabetically" />
                <mdb-input type="checkbox" id="R_alphabetical" name="arrange_R_alpha" v-model="R_alpha" label="Arrange Reverse-Alphabetically" />
                <mdb-btn size="sm" class='center' rounded>Custom Arrangement</mdb-btn>
              </mdb-container>
            </mdb-col>
            <mdb-col lg="3" md="6" class="mb-r">
              <mdb-container class='alignLeft'>
                <p class="label">Category Low Stock Limit</p>
                <p class='description'>(All items in category will automatically hide at this Low Stock Limit unless specific Item Stock Limit is set)</p>
                <mdb-input type='number' v-model='lowStockCategory' />
              </mdb-container>
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
  <mdb-card cascade narrow>
    <mdb-card-header class="font-bold mb-2">

      {{selectedCategory}}

      <mdb-btn size="sm" class='right' rounded>Hide All Items</mdb-btn>


    </mdb-card-header>
    <mdb-col lg="12" md="12" class="mb-r">
      <mdb-tbl responsiveMd>
        <mdb-tbl-head color="primary-color" textWhite>

          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Low Stock Limit</th>
            <th>Product Id#</th>
            <th>Category Id#</th>
            <th>Strain Type</th>
            <th title='Check to hide item from all Menus'>Hide Item</th>

          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
          <tr scope="row" v-for="x in menu">
            <th scope="row">{{x.name}}</th>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>
              <mdb-input class="menuCheckHide" type="checkbox" id="checkboxItem" name="checkItem" v-model="hide" />
            </td>

          </tr>

        </mdb-tbl-body>
      </mdb-tbl>
    </mdb-col>
  </mdb-card>

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
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  mdbInput,
  mdbSelect,
  mdbNumericInput,
  mdbContainer
} from 'mdbvue'

export default {
  name: 'MenuMaker',
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
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbInput,
    mdbSelect,
    mdbNumericInput,
    mdbContainer
  },
  data() {
    return {
      selectedCategory: null,
      hideCategories: [],
      menu: null,
      locations: [{
        text: 'Choose Location',
        value: null,
        disabled: true,
        selected: true
      }],
      categories: [{
        text: 'Choose Category',
        value: null,
        disabled: true,
        selected: true
      }],
      hidden: [{
        text: 'Choose',
        value: null,
        disabled: true,
        selected: true
      }]
    }
  },
  methods: {
    getHiddenValues(value, text) {
      this.hideCategories = value;
    },
    getSelectedCategory(value) {
      this.selectedCategory = value;
    }
  },
  mounted() {
    this.axios
      .get('https://api.compassionate.cloud/greenleaf/menu')
      .then(response => {
        this.menu = response.data.data;
        for (var i = 0; i < this.menu.length; i++) {
          var catObj = {
            text: this.menu[i].name,
            value: this.menu[i].name,
            selected: false
          };
          var hideObj = {
            text: this.menu[i].name,
            value: this.menu[i].name,
            selected: false
          };
          this.categories.push(catObj);
          this.hidden.push(hideObj);
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
}
</script>

<style scoped>
.menuCheckHide {
  padding-left: 0;
}

.description {
  font-size: 11px;
}

.right {
  float: right;
}

.bold {
  font-weight: bold;
}

.cardP {
  padding: 0;
  margin: 0;
}

.left {
  float: left;
}

.label {
  font-weight: bold;
}

.alignLeft {
  text-align: left;
}

.center {
  text-align: center;
}

.verticalCenter {
  align-self: center;
}

.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}

.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
