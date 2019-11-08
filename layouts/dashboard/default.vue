<template>
  <v-app>
    <v-content>
      <v-card class="overflow-hidden fill-height" fluid>
        <NavBar />
        <v-sheet id="scrolling-techniques" class="overflow-y-auto">
          <v-container>
            <nuxt />
          </v-container>
        </v-sheet>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
// Library
import NavBar from '~/components/navbar.vue'

export default {
  components: {
    NavBar
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#scrolling-techniques {
  margin-top: 80px;
}
</style>
