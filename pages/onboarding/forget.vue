<template>
  <v-layout>
    <v-flex class="text-center">
      <v-col cols="12" sm="12">
        <h1 class="title-storent text-left">
          Restablecer<br>Contraseña
        </h1>
        <h1 class="title-storent text-left">
          ¿Has olvidado tu clave o usuario?
        </h1>
        <br>
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
        <b>Ingresa el correo electrónico registrado en Storent</b>
        <br>
        Te enviaremos un correo y un mensaje SMS al teléfono vinculado con un código de 4 digitos para restablecer tu contraseña
        <div class="input-white">
          <v-text-field
            v-model="form.email"
            color="#FFFFFF"
            label="Correo electrónico"
            required
            :rules="[rules.requiredSingle]"
            class="set-white"
          />
        </div>
        <v-btn
          x-large
          class="btn-storent-second my-1 mr-4"
          :disabled="disabledButton"
          :loading="loadingButton"
          @click="login($event)"
        >
          Restablecer
        </v-btn>
        <br>
        <br>
        <br>
        <div class="text-left">
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
      disabledButton: false,
      loadingButton: false,
      form: {
        // Tokens
        accessToken: null,
        authToken: null,
        uid: null,
        email: null
      },
      rules: {
        requiredCustome: (value, field) => {
          const response = !!value || field
          this.showAlert(response)
          return response
        },
        requiredSingle: (value) => {
          const response = !!value || 'Este campo es requerido.'
          return response
        },
        required: (value, field) => {
          const response = !!value || 'El ' + field + ' es requerido.'
          this.showAlert(response)
          return response
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const response =
            pattern.test(value) || 'Correo electronico invalido.'
          this.showAlert(response)
          return response
        }
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
    showAlert (response) {
      if (typeof response === 'string' || response instanceof String) {
        this.alert = response
      }
    },
    login (event) {
      event.preventDefault()
      // Buttons Actions
      this.loadingButton = true
      this.disabledButton = true
      // Check Values
      let check = false
      if (this.form.email) { check += this.rules.email(this.form.email) }
      check += this.rules.requiredCustome(this.form.password, 'La Contraseña es requerida.')
      check += this.rules.required(this.form.email, 'Correo electronico')
      // Set Post
      if (typeof check === 'string' || check instanceof String || check < 3) {
        // Buttons Actions
        this.loadingButton = false
        this.disabledButton = false
        return
      }

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

      this.loadingButton = false
      this.disabledButton = false
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
.forget {
  font-size: 15px;
  text-decoration: none;
  color: white !important;
  letter-spacing: normal;
  padding: 0 !important;
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
