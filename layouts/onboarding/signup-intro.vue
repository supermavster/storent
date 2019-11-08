<template>
  <v-app>
    <v-content>
      <v-container class="fill-height storent-background-second" fluid>
        <v-col class="fill-height" cols="12" sm="12" md="12">
          <v-row class="mx-auto" elevation="12">
            <a to="/" class="mx-6 my-6 py-6 px-6">
              <img src="/images/logo.png">
            </a>
          </v-row>
          <v-row id="content" align="center" justify="center">
            <v-col cols="4" sm="4" md="4" class="mx-1">
              <nuxt />
            </v-col>
            <v-col cols="6" sm="6" md="6" class="main-box">
              <div class="circle" />
              <img class="boxs" src="/images/main-boxs.png" width="100%" height="auto">
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  background: transparent;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
