<template>
  <v-row>
    <v-col cols="12" sm="12" offset-sm="12">
      <v-card>
        <v-container fluid>
          <v-row v-if="categories">
            <div v-for="item in categories" :key="item.categoryId">
              <div id="background-category">
                <a class="link-categories" href="#">
                  <p>{{ item.name }}</p>
                </a>
              </div>
              <div v-for="product in item.products" :key="product.productId">
                <p>{{ product.name }}</p>
              </div>
            </div>
          </v-row>
          <v-row v-else>
            No existen categorias registradas aun.
          </v-row>
          <div class="multiple-items">
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      errors: [],
      alert: '',
      // Form
      accessToken: null,
      categories: null,
      // Carousel
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
      model: 0,
      showArrows: true,
      hideDelimiters: true,
      cycle: true
    }
  },
  async created () {
    await this.initProcess()
  },
  methods: {
    async initProcess () {
      const accessToken = await this.$store.dispatch(`getAccessToken`)
      this.accessToken = accessToken
      this.getCategories()
    },
    getCategories () {
      $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
      })
      this.$store
        .dispatch(`settings/categoriesProducts`, this.accessToken)
        .then((response) => {
          if (response.code === 100) {
            console.log(response)
            this.categories = response.data
          } else {
            this.alert = response.data.message
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response) {
            if (error.response.status === 400) {
              this.alert = error.response.data.message
            }
          }
        })
    },
    searchProduct (category) {}
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: auto;
}

.link-categories {
  z-index: 1;
}

#background-category {
  background-image: url("/images/banner.png") !important;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 250px;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 2rem !important;
}

#background-category::before {
  border-radius: 2rem !important;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
}
</style>
