<template>
  <v-layout>
    <v-flex class="text-center">
      <v-col class="text-center" cols="12" sm="12">
        <div class="my-2">
          <h1>Para ser un usuario Storent debes</h1>
        </div>
        <div class="my-2">
          <b>Registrarse como usuario</b>
          <br>Y
          <br>
          <b>Registrarse como empresa</b>
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-second" to="/signup">
            Continuar
          </v-btn>
        </div>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'signup-intro'
}
</script>
