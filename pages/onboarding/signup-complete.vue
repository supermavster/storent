<template>
  <v-layout style="position: relative">
    <v-flex class="text-center">
      <v-row>
        <v-col cols="12">
          <v-row align="center" class="text-complete" justify="center">
            En las siguientes 24 horas te enviaremos un correo de aceptación como Usuario Storent
          </v-row>
          <v-row align="center" class="text-complete" justify="center">
            En caso de no llegar un correo <b>contactanos a info@storent.com</b>
          </v-row>
          <v-row align="center" justify="center">
            <!-- Continue -->
            <v-btn
              class="btn-storent-main mr-4"
              to="/dashboard"
            >
              Aceptar
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
// import { ValidationProvider, extend } from 'vee-validate'

export default {
  layout: 'onboarding/signup-complete',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.v-application .white--text {
  color: gray !important;
  caret-color: gray !important;
}

.btn-storent-main {
  font-size: 0.8rem;
  height: 45px !important;
  width: 200px !important;
}

.text-complete {
  margin: 5rem auto;
  font-size: 2rem;
  width: 50vw;
}
</style>
