<template>
  <v-layout>
    <v-flex class="text-left">
      <v-col cols="12" sm="12">
        <h1 class="title-storent">
          Tu usuario ésta registrado
        </h1>
        <br>
        <div class="my-2 content-size">
          <b>Ya estas registrado como usuario Storent</b>
          <br>
          <br>Debes registrar tu empresa para poder publicar y reservar una bodega.
          <br>
          <br>De lo contrario solo tendras acceso a la información de las bodegas publicadas.
        </div>
        <br>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-main" to="/onboarding/signup-company">
            Registrar la empresa
          </v-btn>
        </div>
        <div class="my-2">
          <v-btn depressed large class="btn-storent-second" to="/dashboard/home">
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
.title-storent {
  font-weight: unset !important;
  font-size: 2.5rem;
  color: black !important;
}

.content-size {
  width: 300px;
}
</style>
