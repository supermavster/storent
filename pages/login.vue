<template>
  <v-layout>
    <v-flex class="text-center">
      <!--  Error Elements -->
      <div>
        <v-alert
          v-if="alert !== ''"
          prominent
          type="error"
          icon="mdi-alert-circle"
          colored-border
          class="text-error"
        >
          {{ alert }}
        </v-alert>
      </div>
      <v-col class="text-center" cols="12" sm="12">
        <h1 class="title-storent">
          Bienvenido de nuevo
        </h1>
        <v-text-field v-model="form.email" color="white" label="Usuario" required />
        <v-text-field
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          color="white"
          label="Contraseña"
          required
        />
        <v-btn x-large class="btn-storent-second mr-4" @click="login($event)">
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
      showPassword: false,
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
    },
    login (event) {
      event.preventDefault()
      this.$store
        .dispatch(`login`, this.form)
        .then((response) => {
          if (response.status === 200 && response.data.code === 100) {
            // Get Access Token
            this.form.authToken = response.data.data.authToken
            this.$cookie.set('authToken', response.data.data.authToken)
            this.$cookie.set('uid', response.data.data.uid)
            this.form.uid = response.data.data.uid
          } else {
            this.alert = response.data.data.message
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              this.alert = error.response.data.data.message
            }
          }
        })
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
