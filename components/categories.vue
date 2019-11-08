<template>
  <v-row>
    <v-col cols="12" sm="12" offset-sm="12">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" offset-sm="12">
            <v-container fluid>
              <div class="card-carousel-wrapper">
                <div
                  class="card-carousel--nav__left"
                  :disabled="atHeadOfList"
                  @click="moveCarousel(-1)"
                />
                <div class="card-carousel">
                  <div class="card-carousel--overflow-container">
                    <div
                      class="card-carousel-cards"
                      :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
                    >
                      <div
                        v-for="item in categories"
                        :key="item.categoryId"
                        class="card-carousel--card"
                      >
                        <div id="background-category">
                          <a class="link-categories" href="#">
                            <p>{{ item.name }}</p>
                          </a>
                        </div>
                        <div v-for="product in item.products" :key="product.productId">
                          <p>{{ product.name }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="card-carousel--nav__right"
                  :disabled="atEndOfList"
                  @click="moveCarousel(1)"
                />
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
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
      categories: [],
      currentOffset: 0,
      windowSize: 13,
      paginationFactor: 220
    }
  },
  computed: {
    atEndOfList () {
      return (
        this.currentOffset <=
        this.paginationFactor * -1 * (this.categories.length - this.windowSize)
      )
    },
    atHeadOfList () {
      return this.currentOffset === 0
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
    moveCarousel (direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor
      }
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
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}
.card-carousel {
  display: flex;
  justify-content: center;
  width: 100%;
}
.card-carousel--overflow-container {
  overflow: hidden;
}
.card-carousel--nav__left,
.card-carousel--nav__right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 2px solid #42b883;
  border-right: 2px solid #42b883;
  cursor: pointer;
  margin: 0 20px;
  transition: transform 150ms linear;
}
.card-carousel--nav__left[disabled],
.card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}
.card-carousel--nav__left {
  transform: rotate(-135deg);
}
.card-carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.9);
}
.card-carousel--nav__right {
  transform: rotate(45deg);
}
.card-carousel--nav__right:active {
  transform: rotate(45deg) scale(0.9);
}
.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
}
.card-carousel-cards .card-carousel--card {
  margin: 0 10px;
  cursor: pointer;
//   box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
    // 0 2px 2px 0 rgba(40, 44, 53, 0.08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin-bottom: 2px;
}
.card-carousel-cards .card-carousel--card:first-child {
  margin-left: 0;
}
.card-carousel-cards .card-carousel--card:last-child {
  margin-right: 0;
}
.card-carousel-cards .card-carousel--card img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
}
.card-carousel-cards .card-carousel--card img:hover {
  opacity: 0.5;
}
.card-carousel-cards .card-carousel--card--footer {
  border-top: 0;
  padding: 7px 15px;
}
.card-carousel-cards .card-carousel--card--footer p {
  padding: 3px 0;
  margin: 0;
  margin-bottom: 2px;
  font-size: 19px;
  font-weight: 500;
  color: #2c3e50;
  user-select: none;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
  font-size: 12px;
  font-weight: 300;
  padding: 6px;
  background: rgba(40, 44, 53, 0.06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
  border-style: solid;
  border-width: 12px 12px 12px 0;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
  content: "";
  position: absolute;
  top: 10px;
  left: -1px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: 0px 0px 0px #004977;
}
</style>
