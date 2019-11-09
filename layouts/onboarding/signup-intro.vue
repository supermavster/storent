<template>
  <v-app>
    <v-content>
      <v-container class="fill-height storent-background-second" fluid>
        <v-col class="fill-height" cols="12" sm="12" md="12">
          <v-row class="mx-auto" elevation="12">
            <v-btn text to="/" class="mx-2 my-2">
              <img height="30" src="/images/logo-white.png">
            </v-btn>
          </v-row>
          <v-row id="content">
            <v-col cols="4" sm="4" md="4" class="my-10 mx-3">
              <nuxt />
            </v-col>
            <v-col cols="7" sm="7" md="7" class="main-box">
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

label {
    color: white !important;
    border-color: white !important;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: white !important;
}

.circle {
  left: 35% !important;
  top: -70% !important;
}

.boxs {
  left: 4rem;
  top: 3rem;
  width: 44rem;
}
</style>
