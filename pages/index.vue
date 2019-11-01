<template>
  <v-layout>
    <v-flex class="text-center">
      <v-col class="text-center" cols="12" sm="12">
        <div class="my-2">
          <h1>Bienvenido a Storent</h1>
        </div>
        <div class="my-2">
          Somos una plataforma colaborativa
          <br>para el alquiler de micro-bodegas a
          <br>nivel nacional.
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-main" to="/login">
            Iniciar Sesión
          </v-btn>
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-second" to="/signup">
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
