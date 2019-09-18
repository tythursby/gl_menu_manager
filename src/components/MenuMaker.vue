<template>
<section id="profile">

  <mdb-row>

    <mdb-col lg="12" md="12" class="mb-r">
      <mdb-card>
        <mdb-card-header class="font-bold mb-2">
          <mdb-btn class="left" outline="blue" disabled rounded>
            MENU MANAGER
            <mdb-icon icon="cannabis" class="ml-2" />
          </mdb-btn>
        </mdb-card-header>
        <mdb-card-body class="text-center">

          <mdb-row>
            <mdb-col lg="4" md="6">
              <mdb-select style='max-height: 30rem' color='default' @getValue="getSelectedCategory" :options="editCategoryOptions" label="Edit Category" />
              <!-- <mdb-select v-model="locations" label="Inventory Location" /> -->

            </mdb-col>
            <!-- <mdb-col lg="4" md="6">

              <mdb-select style='max-height: 30rem' multiple selectAll @getValue="getHiddenValues" :options="hideOptions" label="Hide Categories" />


            </mdb-col> -->
            <mdb-col lg="4" md="6" class="mb-r">
              <mdb-container class='alignLeft'>
                <p class="label">Category Order</p>

                <mdb-input type="checkbox" id="alphabetical" name="arrange_alpha" v-model="arrangeAlpha" label="Arrange Alphabetically" />

                <mdb-btn size="sm" class='center' outline='default' v-show='!arrangeAlpha' @click.native="modal = true" darkWaves>Custom Arrangement</mdb-btn>

              </mdb-container>
            </mdb-col>

            <mdb-col lg="4" md="6" class="mb-r alignLeft">
              <p class="label">Category Image</p>
              <mdb-container v-for='(x, index) in categories' :key="index">
                <img v-bind:src="x.imagePreview" v-show="x.showPreview && x.name === selectedCategory" alt="thumbnail" class="img-thumbnail left" width='100px' style='margin-right: 5px;' />
                <input type='file' accept="image/*" :id='x.name' :ref='x.name' v-on:change="handleFileUpload(x.name)" v-show='x.name === selectedCategory' />
              </mdb-container>
            </mdb-col>

          </mdb-row>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>

  <mdb-modal size="lg" :show="modal" @close="modal = false">
    <mdb-modal-header>
      Drag and Drop to Arrange
    </mdb-modal-header>
    <mdb-modal-body>
      <draggable v-model="editCategoryOptions" @start="drag=true" @end="newCategoryOrder">
        <div v-for="(cat, index) in editCategoryOptions" :key="index" onmouseover="" style="cursor: pointer;">
          <mdb-btn sm color='default' v-if='cat.value != null' disabled>{{cat.value}}</mdb-btn>
        </div>
      </draggable>
    </mdb-modal-body>
  </mdb-modal>

  <mdb-card cascade narrow v-show='selectedCategory'>
    <mdb-card-header class="font-bold mb-2">
      <mdb-row>
        <mdb-col lg="6" md="6" class="mb-r">
          <mdb-input v-if='x.name === selectedCategory' v-for='(x, index) in categories' :label="x.name" icon="edit" v-model='x.editedName' :key='index' />
          <ul class='info'>
            <li>Drag and drop item rows to rearrange</li>
            <li>All menus will reflect changes upon Push to Cloud</li>
          </ul>
        </mdb-col>

      </mdb-row>
    </mdb-card-header>
    <mdb-col lg="12" md="12" class="mb-r">
      <mdb-tbl responsiveLg>
        <mdb-tbl-head color="primary-color" textWhite>

          <tr>
            <th>
              <mdb-icon far icon="file-image" /> Image
            </th>
            <!--input placeHolder -->
            <th></th>

            <th>Item Name
              <mdb-icon far icon="edit" />
            </th>
            <th>Price</th>
            <!-- <th>Low Stock Limit</th> -->
            <th>Product Id#</th>
            <th>Category Id#</th>
            <th>Strain Type</th>
            <!-- <th title='Check to hide item from all Menus'>Hide Item</th> -->

          </tr>
        </mdb-tbl-head>
        <draggable :list="obj.items" :tag="'tbody'" @end="newProductOrder(obj.items)" ghost-class="ghost" v-for='(obj, index) in products' :key='index'>

          <tr scope="row" v-if='obj.category === selectedCategory' v-for='(x, index) in obj.items' class="tableRow" onmouseover="" style="cursor: pointer;">
            <th scope="row">
              <img v-bind:src="x.imagePreview" v-show='x.imagePreview' alt="thumbnail" class="img-thumbnail left" :width="80" style='margin-right: 5px;' :key="index" />
            </th>
            <td style="vertical-align: middle; padding-left: 0;">
              <input style='font-size: 14px; line-height: 1.2em;' type='file' accept="image/*" :id="'img_'+x.productid" :ref='x.productid' v-on:change="handleFileUploadProducts(x.productid)" :key="index" />
            </td>
            <td style="vertical-align: middle; width: auto">
              <div>
                <label style='margin: 0' v-show='x.showEditing === false && x.editedName === ""' v-on:click='x.showEditing = true'>{{x.name}}</label>
                <label style='margin: 0' v-show='x.showEditing === false && x.editedName != ""' v-on:click='x.showEditing = true'>{{x.editedName}}</label>
                <input v-show='x.showEditing' v-model='x.editedName' v-on:blur="x.showEditing=false; $emit('update')" @keyup.enter="x.showEditing=false; $emit('update')" placeholder="Rename" style='overflow: visible; border: none;' />
              </div>
            </td>
            <td style="vertical-align: middle">{{x.price}}</td>
            <!-- <td>{{}}</td> lowLimit-->
            <td style="vertical-align: middle">{{x.productid}}</td>
            <td style="vertical-align: middle">{{x.productcategory}}</td>
            <td style="vertical-align: middle">{{x.straintype ? x.straintype : 'N/A'}}</td>
            <!-- <td style="vertical-align: middle">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" :id="x.productid" :key='x.productid' :value='x.productid' :disabled="hideCategories.indexOf(x.category) >= 0" v-model="hideItems" class="custom-control-input hideItemInput">
                <label class="custom-control-label" :for='x.productid'></label>
              </div>
            </td> -->
          </tr>

        </draggable>

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
  mdbModal,
  mdbModalBody,
  mdbModalHeader,
  mdbNumericInput,
  mdbContainer
} from 'mdbvue'
import draggable from 'vuedraggable';
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
    mdbModal,
    mdbModalBody,
    mdbModalHeader,
    mdbNumericInput,
    mdbContainer,
    draggable
  },
  data() {
    return {
      modal: false,
      categories: [],
      categoryOrder: [],
      productOrder: [],
      arrangeAlpha: false,
      selectedCategory: null,
      selectedCategoryItems: [],
      hideCategories: [],
      hideItems: [],
      products: [],
      menu: null,
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
    push() {
      var data = {
        arrangeAlpha: this.arrangeAlpha,
        categories: this.categories,
        products: this.products,
        categoryOrder: this.categoryOrder,
        productOrder: this.productOrder,
        hideCategories: this.hideCategories,
        hideItems: this.hideItems
      }
      console.log(data);
    },
    newCategoryOrder() {
      this.categoryOrder = this.editCategoryOptions.filter(x => (x.value != null)).map(y => y.text);
    },
    newProductOrder(value) {
      var category = this.selectedCategory;
      var orderInCat = value.map(x => x.productid);
      var object = {
        category: category,
        newOrder: orderInCat
      };

      const index = this.productOrder.findIndex((e) => e.category === category);

      if (index === -1) {
        this.productOrder.push(object);
      }
      if (index >= 0) {
        this.productOrder[index].newOrder = orderInCat;
      }

    },
    getHiddenValues(value) {
      this.hideCategories = value; //adds/subs category name to []
      // check/uncheck Hide Item for all item id# in category
      var itemsObj = this.menu.map(x => Object.values(x.items).map(item => new Object({
        cat: item.category,
        productid: item.productid
      })));
      var allItems = [].concat.apply([], itemsObj);
      var itemsToHide = allItems.filter(item => (value.indexOf(item.cat) >= 0)).map(x => x.productid);
      this.hideItems = itemsToHide;
    },

    handleFileUpload(x) {
      // console.log(this.$refs[x])
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
      var cat = this.products.filter(e => e.category === this.selectedCategory);
      var items = cat[0].items;
      for (var i = 0; i < items.length; i++) {
        if (items[i].productid === x) {
          var currentItem = items[i];
        }
      }
      currentItem.file = this.$refs[x][0].files[0];

      if (/\.(jpe?g|png|gif)$/i.test(currentItem.file.name)) {

        let reader = new FileReader();

        reader.addEventListener("load", function() {

          currentItem.imagePreview = reader.result;
        }.bind(this), false);

        reader.readAsDataURL(currentItem.file);
      }

    },
    getSelectedCategory(value) {
      this.selectedCategory = value;

      for (var i = 0; i < this.menu.length; i++) {
        var cats = this.menu[i].name;
        var items = this.menu[i].items;
        if (cats.indexOf(value) > 0) {
          this.selectedCategoryItems = items;
        }
      }

    }
  },
  mounted() {
    this.axios
      .get('https://api.compassionate.cloud/greenleaf/menu')
      .then(response => {
        this.menu = response.data.data;
        var organized = this.menu.map(cat => new Object({
          category: cat.name,
          items: Object.values(cat.items).map(x => new Object({
            name: x.name,
            category: x.category,
            productid: x.productid,
            price: x.price,
            productcategory: x.productcategory,
            straintype: x.straintype,
            showEditing: false,
            editedName: '',
            file: '',
            imagePreview: '',
          }))

        }));

        this.products = [].concat.apply([], organized);

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

#itemName.md-form .form-control {
  margin: 0;
}

.md-form {
  margin: 0;
}

.container {
  padding: 0;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
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

[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  /* Required to make elements draggable in old WebKit */
  -khtml-user-drag: element;
  -webkit-user-drag: element;
}
</style>
