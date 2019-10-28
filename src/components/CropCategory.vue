<template>
  <mdb-modal size='lg' v-show="show" @close="closeCategoryModal()" :removeBackdrop='false'>
    <mdb-modal-header>
      Crop Image - {{categoryName}}
    </mdb-modal-header>
    <mdb-modal-body>
      <div>
        <div v-show='loading' class='loading'>
          <mdb-spinner v-show='loading' big/>
          <label class='loadingText' v-show='loading'> ...uploading</label>
        </div>
        <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
        <vue-croppie ref="croppieRef" :enforceBoundary='true' :enableOrientation="true" :enableResize:='false' @result="result" @update="update" :viewport="{ width: 500, height: 500, type: 'square' }" :boundary="{ width: '100%', height: 600 }">

        </vue-croppie>

      </div>
    </mdb-modal-body>
    <mdb-modal-footer>

      <mdb-btn size="sm" style='float: right' color='default' @click.native="closeCategoryModal(categoryImageId)" darkWaves :disabled='loading'>cancel</mdb-btn>
      <mdb-btn size="sm" style='float: right' color='default' @click.native="crop(); post()" darkWaves :disabled='loading'>Crop + Upload</mdb-btn>
    </mdb-modal-footer>
  </mdb-modal>



  </template>

  <script>
  import {
    mdbBtn,
    mdbSpinner,
    mdbRow,
    mdbCol,
    mdbModalBody,
    mdbModal,
    mdbModalFooter,
    mdbModalHeader
  }from 'mdbvue'
  export default {
    name: 'CropCategoryModal',
    props: {
      categoryImage: {
        type: String
      },
      categoryImageId: {
        type: String
      },
      categoryName: {
        type: String
      },
      show: {
        type: Boolean
      }
    },
    components: {
      mdbBtn,
      mdbSpinner,
      mdbRow,
      mdbCol,
      mdbModalBody,
      mdbModal,
      mdbModalFooter,
      mdbModalHeader
    },
    data() {
      return {
        cropped: null,
        loading: false,
      }
    },
    watch: {
      categoryImage: function(){
        this.$refs.croppieRef.bind({
          url: this.categoryImage
        })
      }
    },
    methods: {

      crop() {
        this.$refs.croppieRef.result((output) => {
          return this.cropped = output;
        });
      },
      closeCategoryModal(id){
        this.$emit('closeModal');
        this.$parent.resetInput(id);

      },
      async post() {
        this.loading = true;
        await this.crop();
        var base64result = this.cropped.split(',')[1];
        this.axios
          .post('https://api.compassionate.cloud/photo/category', {
            org: 'greenleaf',
            category: this.categoryImageId,
            photo: base64result
          })
          .then(function(response) {
            this.$emit('closeModal');
            this.loading = false;
            console.log(response);
            // if (response.data.success === true) {
            //
            // }
          }.bind(this))
          .catch(function(error) {
            console.log(error);
          })
      },

      result(output) {
        this.cropped = output;
      },
      update(val) {
        console.log(val);
      },
      rotate(rotationAngle) {
        // Rotates the image
        this.$refs.croppieRef.rotate(rotationAngle);
      }
    }
  }
  </script>
  <style scoped>
    .loading {
      position: absolute;
      top: 40%;
      display: flex;
      margin: 0;
      z-index: 10000;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: auto;
      padding: 1rem;
      width: calc(100% - 2rem);
      background-color: white;
    }
    .loadingText {
      margin-left: 5px;
    }
  </style>
