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
      <v-col class="" cols="12" sm="12">
        <h1 class="title-storent text-left">
          Bienvenido de nuevo
        </h1>
        <br>
        <br>
        <br>
        <div class="input-white">
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
        <br>
        <br>
        <br>
        <div class="text-left">
          <a to="/onboarding/forget">
            ¿Olvidaste tu contraseña?
          </a>
          <br>
          <v-btn class="register" text to="/onboarding/signup-intro">
            Registrarse
          </v-btn>
        </div>
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
            this.$cookie.set('authToken', response.data.data.authToken)
            this.$cookie.set('uid', response.data.data.uid)
            // Change View
            this.$router.push({ path: '/dashboard', force: true })
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
* {
  background: transparent;
  overflow-y: hidden;
  overflow-x: hidden;
}
.title-storent {
  font-weight: unset !important;
  font-size: 3rem;
}
a {
  font-size: 15px;
  text-decoration: none;
  color: white !important;
}
.register {
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  color: white !important;
  letter-spacing: normal;
  padding: 0 !important;
}
</style>
