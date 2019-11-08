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
        <br>
        <br>
        <br>
        <br>
        <div class="my-2">
          <v-text-field
            v-model="form.email"
            color="#FFFFFF"
            label="Usuario"
            required
            class="set-white"
          />
          <v-text-field
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            color="white"
            label="Contraseña"
            class="set-white"
            required
          />
        </div>
        <v-btn x-large class="btn-storent-second mr-4" @click="login($event)">
          Iniciar Sesión
        </v-btn>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'onboarding/login',
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
label,.v-label,label.v-label.theme--light {
  color: white;
}
.v-input__slot:before {
  color: white;
  border-color: white !important;
}

input {
  color: white !important;
}
.v-input__slot:before {
  border-color: white !important;
}
</style>
