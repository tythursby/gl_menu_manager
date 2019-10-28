<template>
<section id="profile">

  <mdb-row>

    <mdb-col lg="12" md="12">
      <mdb-card>
        <mdb-card-body class="text-center">

          <mdb-row>

            <mdb-col lg="4" md="6">
              <mdb-select style='max-height: 30rem' color='default' @getValue="getSelectedCategory" :options="editCategoryOptions" label="Edit Category" />

            </mdb-col>
            <mdb-col lg="2" md="6" class="alignLeft">
              <mdb-container>
                <p class="label">Category Order</p>

                <mdb-btn size="sm" class='center' outline='default' @click.native="categoryModal = true" darkWaves rounded>Arrange Categories</mdb-btn>

              </mdb-container>
            </mdb-col>
            <mdb-col lg="4" md="6" class="alignLeft">
              <p class="label">Category Image</p>

              <tr v-for='(x, index) in categories' :key="index" v-show="x.name === selectedCategory" style='flex-direction: row;'>

                <img v-bind:src="x.imagePreview ? x.imagePreview : x.photo" alt="thumbnail" class="img-thumbnails left" width='100px' style='margin-right: 10px;' />

                <td style="vertical-align: top; padding-left: 0;">
                  <input class='category' style='font-size: 14px; line-height: 1.2em' type='file' accept="image/*" :id="'img_'+x.id" :ref='x.id' v-on:change="handleFileUploadCategory(x.id); categoryImageId = x.id " />
                </td>
              </tr>
            </mdb-col>

          </mdb-row>

        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>

  <mdb-modal size="lg" :show="categoryModal" @close="categoryModal = false">
    <mdb-modal-header>
      Drag and Drop to Arrange
    </mdb-modal-header>
    <mdb-modal-body>
      <draggable v-model="editCategoryOptions" @start="drag=true" @end="postCategoryOrder">
        <div v-for="(cat, index) in editCategoryOptions" :key="index" onmouseover="" style="cursor: pointer;">
          <mdb-btn sm color='default' v-if='cat.value != null' disabled>{{cat.value}}</mdb-btn>
        </div>
      </draggable>
    </mdb-modal-body>
  </mdb-modal>

  <mdb-card cascade narrow v-show='selectedCategory'>
    <mdb-card-header class="font-bold mb-2">
      <mdb-row v-if='x.name === selectedCategory' v-for='(x, index) in categories' :key='index'>
        <mdb-col lg="6" md="6" class="mb-r">
          <mdb-input :label="x.name" icon="edit" v-model='x.editedName' />
          <ul class='info'>
            <li>Drag and drop item rows to rearrange</li>
            <li>Click Item Name to edit</li>
          </ul>
        </mdb-col>
        <mdb-btn size="sm" style='height:40px' outline='default' @click.native="postRenameCategory(x.editedName, x.id)" darkWaves rounded>rename</mdb-btn>
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
            <!-- <th>Product Id#</th>
            <th>Category Id#</th>
            <th>Strain Type</th> -->
            <!-- <th title='Check to hide item from all Menus'>Hide Item</th> -->

          </tr>
        </mdb-tbl-head>
        <draggable :list="obj.items" :tag="'tbody'" @end="postProductOrder(obj)" ghost-class="ghost" v-for='(obj, index) in products' :key='index'>

          <tr scope="row" v-if='obj.category === selectedCategory' v-for='(x, index) in obj.items' class="tableRow" onmouseover="" style="cursor: pointer;">
            <th scope="row">
              <img v-bind:src="x.imagePreview ? x.imagePreview : x.photo" alt="thumbnail" class="img-thumbnails left" :width="80" style='margin-right: 5px;' :key="index" />
            </th>
            <td style="vertical-align: middle; padding-left: 0;">
              <input style='font-size: 14px; line-height: 1.2em;' type='file' accept="image/*" :id="'img_'+x.id" :ref='x.id' v-on:change="handleFileUploadProducts(x.id); productImageId = x.id" :key="index" />
            </td>
            <td style="vertical-align: middle; width: auto">
              <div>
                <label class="nameLabel" onmouseover="" style="cursor: text;" v-show='x.showEditing === false && x.editedName === ""' v-on:click='x.showEditing = true'>{{x.name}}</label>
                <label class="nameLabel" onmouseover="" style="cursor: text;" v-show='x.showEditing === false && x.editedName != ""' v-on:click='x.showEditing = true'>{{x.editedName}}</label>
                <input v-show='x.showEditing' v-model='x.editedName' v-on:blur="x.showEditing=false; $emit('update'); postRenameProduct(x.editedName, x.id)" @keyup.enter="x.showEditing=false; $emit('update')" placeholder="Rename"
                  style='overflow: visible; border: none;' />
              </div>
            </td>
            <td style="vertical-align: middle">{{x.price}}</td>
            <!-- <td>{{}}</td> lowLimit-->
            <!-- <td style="vertical-align: middle">{{x.productid}}</td>
            <td style="vertical-align: middle">{{x.productcategory}}</td>
            <td style="vertical-align: middle">{{x.straintype ? x.straintype : 'N/A'}}</td> -->
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
  <CropModal :productImage='productImage' :productImageId='productImageId' :show='showCropProductModal' @closeModal='closeProductModal'>
  </CropModal>
  <CropCategoryModal :categoryImage='categoryImage' :categoryImageId='categoryImageId' :categoryName='selectedCategory' :show='showCropCategoryModal' @closeModal='closeCategoryModal'>
  </CropCategoryModal>
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
import CropModal from './CropComponent';
import CropCategoryModal from './CropCategory';
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
    draggable,
    CropModal,
    CropCategoryModal
  },
  data() {
    return {
      categoryModal: false,
      showCropProductModal: false,
      showCropCategoryModal: false,
      productImage: '',
      productImageId: null,
      categoryImage: '',
      categoryImageId: null,
      cropped: null,
      productImageFile: '',
      categoryImageFile: '',
      categories: [],
      categoryOrder: [],
      productOrder: [],
      selectedCategory: null,
      selectedCategoryItems: [],
      products: [],
      menu: null,
      editCategoryOptions: [{
        text: 'Choose Category',
        value: null,
        disabled: true,
        selected: true
      }],
    }
  },
  methods: {
    closeProductModal() {
      this.showCropProductModal = false
    },
    closeCategoryModal() {
      this.showCropCategoryModal = false
    },
    resetInput(id) {
      document.getElementById('img_' + id).value = '';
    },
    postRenameProduct(newName, id) {
      this.axios
        .post('https://api.compassionate.cloud/rename/product', {
          org: 'greenleaf',
          id: id,
          name: newName
        })
        .then(function(response) {
          console.log(response);
          // if (response.data.success === true) {
          //
          // }
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    postRenameCategory(newName, id) {
      this.axios
        .post('https://api.compassionate.cloud/rename/category', {
          org: 'greenleaf',
          id: id,
          name: newName
        })
        .then(function(response) {
          console.log(response);
          // if (response.data.success === true) {
          //
          // }
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    postCategoryOrder() {
      this.categoryOrder = this.editCategoryOptions.filter(x => (x.value != null)).map(y => y.id);

      this.axios
        .post('https://api.compassionate.cloud/reorder/category', {
          org: 'greenleaf',
          categories: this.categoryOrder
        })
        .then(function(response) {
          console.log(response);
          // if (response.data.success === true) {
          //
          // }
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    postProductOrder(obj) {
      var category = obj.id;
      var orderInCat = obj.items.map(x => x.id);

      // alert(JSON.stringify(object));
      this.axios
        .post('https://api.compassionate.cloud/reorder/products', {
          org: 'greenleaf',
          products: orderInCat,
          category: category
        })
        .then(function(response) {
          console.log(response);
          // if (response.data.success === true) {
          //
          // }
        })
        .catch(function(error) {
          console.log(error);
        })

    },

    handleFileUploadCategory(x) {

      this.categoryImageFile = this.$refs[x][0].files[0];

      if (/\.(jpe?g|png|gif)$/i.test(this.categoryImageFile.name)) {

        let reader = new FileReader();

        reader.addEventListener("load", function() {

          this.categoryImage = reader.result;

        }.bind(this), false);

        reader.readAsDataURL(this.categoryImageFile);

      }
      this.showCropCategoryModal = true;

    },

    handleFileUploadProducts(x) {

      this.productImageFile = this.$refs[x][0].files[0];

      if (/\.(jpe?g|png|gif)$/i.test(this.productImageFile.name)) {

        let reader = new FileReader();

        reader.addEventListener("load", function() {

          this.productImage = reader.result;

        }.bind(this), false);

        reader.readAsDataURL(this.productImageFile);

      }
      this.showCropProductModal = true;
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
      .get('https://api.compassionate.cloud/greenleaf/menu2')
      .then(response => {
        this.menu = response.data.data;
        var organized = this.menu.map(cat => new Object({
          category: cat.name,
          id: cat.id,
          items: Object.values(cat.items).map(x => new Object({
            name: x.name,
            id: x.id,
            price: x.price,
            photo: x.photo,
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
            id: this.menu[i].id,
            photo: this.menu[i].photo,
            editedName: '',
            file: '',
            imagePreview: '',
            showPreview: false
          };
          var catObj = {
            text: this.menu[i].name,
            id: this.menu[i].id,
            value: this.menu[i].name,
            selected: false
          };

          this.editCategoryOptions.push(catObj);

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
  font-size: 14px;
  align-self: 'center';
  margin-bottom: .5rem !important;
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

/* input[type='file'].category {
  color: transparent;
} */

.verticalCenter {
  align-self: center;

}

.nameLabel {
  margin: 0;
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

.croppie-container .cr-image {
  z-index: 1000;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  max-height: none;
  max-width: none;
}

.img-thumbnails {
  padding: .15rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: .25rem;
  height: auto;
}
</style>
