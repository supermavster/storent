<template>
  <v-layout>
    <v-flex class="text-left">
      <v-col cols="12" sm="12">
        <div class="my-8">
          <h1 class="title-storent">
            Para ser un usuario Storent debes
          </h1>
        </div>
        <br>
        <div class="text-white my-2">
          <b>Registrarse como usuario</b>
          <br>
          Y
          <br>
          <b>Registrarse como empresa</b>
        </div>
        <br>
        <div class="my-6">
          <v-btn depressed large class="btn-storent-main" to="/onboarding/signup">
            Continuar
          </v-btn>
        </div>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'onboarding/signup-intro'
}
</script>

<style lang="scss" scoped>
.title-storent {
  font-weight: unset !important;
  font-size: 2.5rem;
  color: white !important;
}

.text-white {
  color: white !important;
  font-size: 1rem;
}

.btn-storent-main {
  width: 200px;
}
</style>
