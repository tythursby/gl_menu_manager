<template>
<section id="profile">

  <mdb-card class="mb-4">
    <mdb-card-body class="d-sm-flex justify-content-between">
      <img src="../assets/greenleaf-logo.png" height='50'>

      <mdb-btn class="right" outline="blue" tag="a" href="#" darkWaves>PUSH TO CLOUD
        <mdb-icon icon="cloud" class="ml-2" />
      </mdb-btn>
    </mdb-card-body>
  </mdb-card>
  <mdb-row>

    <mdb-col lg="12" md="12" class="mb-r">
      <mdb-card>
        <mdb-card-header class="font-bold mb-2">
          Actions
        </mdb-card-header>
        <mdb-card-body class="text-center">

          <mdb-row>
            <mdb-col lg="3" md="6">
              <mdb-select color='default' @getValue="getSelectedCategory" :options="categories" label="Edit Category" />
              <!-- <mdb-select v-model="locations" label="Inventory Location" /> -->

            </mdb-col>
            <mdb-col lg="3" md="6">

              <mdb-select multiple selectAll @getValue="getHiddenValues" :options="hideOptions" label="Hide Categories" />


            </mdb-col>
            <mdb-col lg="3" md="6" class="mb-r">
              <mdb-container class='alignLeft'>
                <p class="label">Category Order</p>
                <mdb-input type="checkbox" id="alphabetical" name="arrange_alpha" v-model="arrangeAlpha" label="Arrange Alphabetically" />

                <mdb-btn size="sm" class='center' outline='default' darkWaves>Custom Arrangement</mdb-btn>
              </mdb-container>
            </mdb-col>
            <mdb-col lg="3" md="6" class="mb-r">

              <mdb-container class='alignLeft'>
                <p class="label">Category Image</p>
                <mdb-file-input sm btnColor="primary" v-model='categoryImage' />
              </mdb-container>
              <!-- <mdb-container class='alignLeft'>
                <p class="label">Category Low Stock Limit</p>
                <p class='description'>(All items in category will automatically hide at this Low Stock Limit unless specific Item Stock Limit is set)</p>
                <mdb-input type='number' v-model='lowStockCategory' />
              </mdb-container> -->
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
  <mdb-card cascade narrow>
    <mdb-card-header class="font-bold mb-2">



    </mdb-card-header>
    <mdb-col lg="12" md="12" class="mb-r">
      <mdb-tbl responsiveMd>
        <mdb-tbl-head color="primary-color" textWhite>

          <tr>
            <th>
              <mdb-icon far icon="file-image" />
            </th>
            <th>Item Name</th>
            <th>Price</th>
            <!-- <th>Low Stock Limit</th> -->
            <th>Product Id#</th>
            <th>Category Id#</th>
            <th>Strain Type</th>
            <th title='Check to hide item from all Menus'>Hide Item</th>

          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
          <tr scope="row" v-for='x in selectedCategoryItems' class="tableRow">
            <th scope="row"><img src="https://mdbootstrap.com/img/Others/documentation/img%20(75)-mini.jpg" alt="thumbnail" class="img-thumbnail left" style="width: 80px; height: 80px">
            </th>
            <td style="vertical-align: middle">{{x.name}}</td>
            <td style="vertical-align: middle">{{x.price}}</td>
            <!-- <td>{{}}</td> -->
            <td style="vertical-align: middle">{{x.productid}}</td>
            <td style="vertical-align: middle">{{x.productcategory}}</td>
            <td style="vertical-align: middle">{{x.straintype ? x.straintype : 'N/A'}}</td>
            <td style="vertical-align: middle">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" :id="x.productid" :key='x.productid' :value='x.productid' v-model="hideItems" class="custom-control-input hideItemInput">
                <label class="custom-control-label" :for='x.productid'></label>
              </div>
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
  mdbFileInput,
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
    mdbFileInput,
    mdbSelect,
    mdbNumericInput,
    mdbContainer
  },
  data() {
    return {
      arrangeAlpha: null,
      selectedCategory: null,
      categoryImage: null,
      selectedCategoryItems: [],
      hideCategories: [],
      hideItems: [],
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
      hideOptions: [{
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
    addItemHide(value, id) {
      this.hideProducts = {
        id: id,
        hidden: value
      };
    },
    getSelectedCategory(value) {
      this.selectedCategory = value;

      for (var i = 0; i < this.menu.length; i++) {
        var itemList = Object.values(this.menu[i].items);
        var catList = Object.values(this.menu[i]);

        if (catList.includes(value)) {

          this.selectedCategoryItems = itemList;

        }
      }
    }
  },
  mounted() {
    this.axios
      .get('https://api.compassionate.cloud/greenleaf/menu')
      .then(response => {
        this.menu = response.data.data;
        for (var i = 0; i < this.menu.length; i++) {
          var itemList = Object.values(this.menu[i].items);

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
          this.hideOptions.push(hideObj);

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
.editCatName {
  width: 25%;
}

.md-form {
  margin: 0;
}

.container {
  padding: 0;
}

.hideItemInput {
  vertical-align: middle;
}

.form-check {

  padding-left: 0;
}

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

.locationHeader {
  margin: 0;
  padding: 0;
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
