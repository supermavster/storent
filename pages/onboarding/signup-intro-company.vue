<template>
  <v-layout>
    <v-flex class="text-center">
      <v-col class="text-center" cols="12" sm="12">
        <div class="my-2">
          <h1>Tu usuario ésta registrado</h1>
        </div>
        <div class="my-2">
          <b>Ya estas registrado como usuario Storent</b>
          <br>
          <br>Debes registrar tu empresa para poder publicar y reservar una bodega.
          <br>
          <br>De lo contrario solo tendras acceso a la información de las bodegas publicadas.
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-second" to="/signup-company">
            Registrar la empresa
          </v-btn>
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-second" to="/home">
            Continuar a Storent
          </v-btn>
        </div>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'onboarding/information'
}
</script>

<style lang="scss" scoped>
</style>
