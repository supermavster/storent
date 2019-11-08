<template>
  <v-app-bar
    absolute
    elevate-on-scroll
    scroll-target="#scrolling-techniques"
    class="navbar-background"
  >
    <img src="/images/logo-white.png">
    <v-spacer />
    <v-toolbar-items>
      <v-btn class="btn-storent-navbar" to="/onboarding/login">
        Publicar Bodega
      </v-btn>
      <v-btn text color="white">
        Contactanos
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-wechat</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn rounded>
        <v-icon left>
          mdi-account
        </v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({})
}
</script>

<style lang="scss" scoped>
* {
  background-color: transparent;
}
</style>
