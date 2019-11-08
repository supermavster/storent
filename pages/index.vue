<template>
  <v-layout>
    <v-flex>
      <v-col class="text-center" cols="12" sm="12">
        <div class="my-6 text-justify">
          <h1>Bienvenido a Storent</h1>
        </div>
        <div class="my-9 text-justify text-bold">
          Somos una plataforma colaborativa para el alquiler de micro-bodegas a nivel nacional.
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-main" to="/onboarding/login">
            Iniciar Sesión
          </v-btn>
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-second" to="/onboarding/signup-intro">
            Registrate
          </v-btn>
        </div>
        <div class="my-2">
          <a href="#" class="link-storent">Contactanos</a>
        </div>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
* {
  background-color: transparent;
}
</style>
