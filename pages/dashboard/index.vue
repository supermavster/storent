<template>
  <v-layout>
    <v-flex class="text-center">
      <Banner />
      <h1> Que deseas almacenar? </h1>
      <Categories />
       
    </v-flex>
  </v-layout>
</template>

<script>
import Banner from '~/components/banner.vue'
import Categories from '~/components/categories.vue'

export default {
  components: {
    Banner,
    Categories
  },
  layout: 'dashboard/default'
}
</script>
