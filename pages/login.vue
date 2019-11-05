<template>
  <v-layout>
    <v-flex class="text-center">
      <v-col class="text-center" cols="12" sm="12">
        <h1 class="title-storent">
          Bienvenido de nuevo
        </h1>
        <v-text-field color="white" label="Usuario" required />
        <v-text-field color="white" label="Contraseña" required />
        <v-btn x-large class="btn-storent-second mr-4">
          Iniciar Sesión
        </v-btn>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'login',
  data () {
    return {
      errors: [],
      alert: '',
      // Form
      form: {
        // Tokens
        accessToken: null,
        authToken: null,
        uid: null,
        email: null
      }
    }
  },
  async created () {
    await this.initProcess()
  },
  methods: {
    async initProcess () {
      const accessToken = await this.$store.dispatch(`getAccessToken`)
      this.form.accessToken = accessToken
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: white;
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: white;
}
</style>
