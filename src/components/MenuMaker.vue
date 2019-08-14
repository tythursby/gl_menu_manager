<template>
<section id="profile">

  <mdb-card class="mb-4">
    <mdb-card-body class="d-sm-flex justify-content-between">
      <mdb-btn class="right" outline="blue" disabled rounded>
        MENU MANAGER
        <mdb-icon icon="cannabis" class="ml-2" />
      </mdb-btn>

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
            <mdb-col lg="4" md="6">
              <mdb-select color='default' @getValue="getSelectedCategory" :options="editCategoryOptions" label="Edit Category" />
              <!-- <mdb-select v-model="locations" label="Inventory Location" /> -->

            </mdb-col>
            <mdb-col lg="4" md="6">

              <mdb-select multiple selectAll @getValue="getHiddenValues" :options="hideOptions" label="Hide Categories" />


            </mdb-col>
            <mdb-col lg="4" md="6" class="mb-r">
              <mdb-container class='alignLeft'>
                <p class="label">Category Order</p>

                <mdb-input type="checkbox" id="alphabetical" name="arrange_alpha" v-model="arrangeAlpha" label="Arrange Alphabetically" />

                <mdb-btn size="sm" class='center' outline='default' darkWaves>Custom Arrangement</mdb-btn>

              </mdb-container>
            </mdb-col>
            <!-- <mdb-col lg="3" md="6" class="mb-r"> -->


            <!-- <mdb-container class='alignLeft'>
                <p class="label">Category Low Stock Limit</p>
                <p class='description'>(All items in category will automatically hide at this Low Stock Limit unless specific Item Stock Limit is set)</p>
                <mdb-input type='number' v-model='lowStockCategory' />
              </mdb-container> -->
            <!-- </mdb-col> -->
          </mdb-row>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
  <mdb-card cascade narrow>
    <mdb-card-header class="font-bold mb-2">
      <mdb-row>
        <mdb-col lg="6" md="6" class="mb-r">
          <mdb-input :label="selectedCategory" icon="edit" />
          <p class='info'>(Changes to names will be reflected after successful Push To Cloud)</p>
        </mdb-col>
        <mdb-col lg="6" md="6" class="mb-r">
          <p class="label">Category Image</p>
          <mdb-container class='right' v-for='(x, index) in categories' :key="index">
            <img v-bind:src="x.imagePreview" v-show="x.showPreview && x.name === selectedCategory" alt="thumbnail" class="img-thumbnail left" width='100px' style='margin-right: 5px;' />
            <input type='file' accept="image/*" :id='x.name' :ref='x.name' v-on:change="handleFileUpload(x.name)" v-show='x.name === selectedCategory' />
          </mdb-container>
        </mdb-col>
      </mdb-row>
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
            <th scope="row"><img alt="thumbnail" class="img-thumbnail left" style="width: 80px; height: 80px">
            </th>
            <td style="vertical-align: middle">
              {{x.name}}
            </td>
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
      file: '',
      categories: [],
      arrangeAlpha: true,
      selectedCategory: null,
      selectedCategoryItems: [],
      hideCategories: [],
      hideItems: [],
      products: [],
      menu: null,
      // locations: [{
      //   text: 'Choose Location',
      //   value: null,
      //   disabled: true,
      //   selected: true
      // }],
      editCategoryOptions: [{
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
    handleFileUpload(x) {
      console.log(this.$refs[x])
      for (var i = 0; i < this.categories.length; i++) {
        var name = this.categories[i].name;
        if (name === x) {
          this.categories[i].file = this.$refs[x][0].files[0];
          var current = this.categories[i];
          if (/\.(jpe?g|png|gif)$/i.test(this.categories[i].file.name)) {

            let reader = new FileReader();

            reader.addEventListener("load", function() {
              current.showPreview = true;
              current.imagePreview = reader.result;
            }.bind(this), false);

            reader.readAsDataURL(this.categories[i].file);
          }
        }
      }
    },
    handleFileUploadProducts(x) {
      console.log(this.$refs[x])
      for (var i = 0; i < this.products.length; i++) {
        var name = this.products[i].name;
        if (name === x) {
          this.products[i].file = this.$refs[x][0].files[0];
          var current = this.products[i];
          if (/\.(jpe?g|png|gif)$/i.test(this.products[i].file.name)) {

            let reader = new FileReader();

            reader.addEventListener("load", function() {
              current.showPreview = true;
              current.imagePreview = reader.result;
            }.bind(this), false);

            reader.readAsDataURL(this.products[i].file);
          }
        }
      }
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
        var items = this.menu.map(item =>
          Object.values(item.items).map(x => x.productid)
        );
        var merged = [].concat.apply([], items);

        for (var i = 0; i < merged.length; i++) {
          var productsObj = {
            productId: merged[i],
            editedName: '',
            file: '',
            imagePreview: '',
          }
          this.products.push(productsObj);
        };

        for (var i = 0; i < this.menu.length; i++) {

          var catImageObj = {
            name: this.menu[i].name,
            editedName: '',
            file: '',
            imagePreview: '',
            showPreview: false
          };
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
          this.editCategoryOptions.push(catObj);
          this.hideOptions.push(hideObj);
          this.categories.push(catImageObj);

        };
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
  align-self: 'center';
}

.alignLeft {
  text-align: left;
}

.center {
  text-align: center;
}

.itemName {
  width: 100%;
  border: none;
}

.info {
  font-size: 12px;
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
