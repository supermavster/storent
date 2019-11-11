<template>
  <v-layout>
    <v-flex class="text-center">
      <v-col cols="12" sm="12">
        <!--  Error Elements -->
        <div>
          <CheckConection />
          <v-alert
            v-if="alert !== ''"
            type="error"
            icon="mdi-alert-circle"
            transition="scale-transition"
          >
            {{ alert }}
          </v-alert>
          <v-alert
            v-if="success !== ''"
            type="success"
            transition="scale-transition"
          >
            {{ success }}
          </v-alert>
        </div>
        <div v-if="step === 1">
          <!-- Title -->
          <h1 class="title-storent text-left">
            ¿Has olvidado tu clave o usuario?
          </h1>
          <!-- Content -->
          <div>
            <b>Ingresa el correo electrónico registrado en Storent</b>
            <br>
            Te enviaremos un correo y un mensaje SMS al teléfono vinculado con un código de 4 digitos para restablecer tu contraseña
          </div>
          <div class="input-white">
            <v-text-field
              v-model="form.email"
              color="#FFFFFF"
              label="Correo electrónico"
              required
              :rules="[rules.requiredSingle]"
              class="set-white"
            />
            <v-btn
              x-large
              class="btn-storent-second my-1 mr-4"
              :disabled="disabledButton"
              :loading="loadingButton"
              @click="forget($event)"
            >
              Restablecer
            </v-btn>
          </div>
        </div>
        <div v-if="step === 2">
          <!-- Title -->
          <h1 class="title-storent text-left">
            Restablecer<br>Contraseña
          </h1>
          <b>Hemos enviado a tu celular un código de 4 digitos para restablecer tu contraseña</b>
          <!-- Content -->
          <v-row class="mx-1" align="center" justify="center">
            <v-text-field
              v-model="code.one"
              color="#FFFFFF"
              required
              placeholder="   0"
              :rules="[rules.requiredSingle]"
              class="set-white-exception"
            />

            <v-text-field
              v-model="code.two"
              color="#FFFFFF"
              required
              placeholder="   0"
              :rules="[rules.requiredSingle]"
              class="set-white-exception"
            />

            <v-text-field
              v-model="code.three"
              color="#FFFFFF"
              placeholder="   0"
              required
              :rules="[rules.requiredSingle]"
              class="set-white-exception"
            />

            <v-text-field
              v-model="code.four"
              color="#FFFFFF"
              placeholder="   0"
              required
              :rules="[rules.requiredSingle]"
              class="set-white-exception"
            />
          </v-row>
          <v-btn
            x-large
            class="btn-storent-second my-1 mr-4"
            :disabled="disabledButton"
            :loading="loadingButton"
            @click="recovery($event)"
          >
            Continuar
          </v-btn>
          <br>
          Si el correo no se encuentra en tu bandeja de entrada contactanos aquí
        </div>
        <div v-if="step === 3">
          <h1 class="title-storent text-left">
            Restablecer<br>Contraseña
          </h1>
          <div>
            Ingresa una nueva contraseña
            <v-text-field
              v-model="form.password"
              single-line
              color="white"
              label="Contraseña"
              required
              :rules="[rules.requiredSingle]"
            />
            <v-text-field
              v-model="form.passwordRepet"
              color="white"
              label="Confirmar contraseña"
              required
              single-line
              :rules="[rules.requiredSingle]"
            />
            <v-btn
              x-large
              class="btn-storent-second my-1 mr-4"
              :disabled="disabledButton"
              :loading="loadingButton"
              @click="recovery($event)"
            >
              Restablecer
            </v-btn>
          </div>
        </div>
        <div v-if="step === 4">
          <h1 class="title-storent text-left">
            ¡Tu contraseña fue<br>restablecida<br>exitosamente!
          </h1>
          <b>Ahora podrás ingresar a Storent</b>
          <v-btn
            x-large
            class="btn-storent-second my-1 mr-4"
            text
            to="/onboarding/login"
          >
            Ingresar
          </v-btn>
        </div>
        <!-- Footer -->
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

// Library
import CheckConection from '~/components/checkConection.vue'

export default {
  layout: 'onboarding/login',
  components: {
    CheckConection
  },
  data () {
    return {
      step: 4,
      errors: [],
      alert: '',
      success: '',
      // Form
      showPassword: false,
      disabledButton: false,
      loadingButton: false,
      form: {
        // Tokens
        accessToken: null,
        authToken: null,
        uid: null,
        code: null,
        password: null,
        passwordRepet: null
      },
      code: {
        one: null,
        two: null,
        three: null,
        four: null
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
        },
        password: (value) => {
          const pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
          const response =
            pattern.test(value) ||
            'La contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
          this.showAlert(response)
          return response
        },
        passwordRepet: (value) => {
          const checkValues = value === this.form.password
          const response = checkValues || 'Las contraseñas no son iguales.'
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
      const step = this.$route.params.step
      if (typeof step !== 'undefined' && step !== null) {
        this.step = this.$route.params.step
      }
    },
    showAlert (response) {
      if (typeof response === 'string' || response instanceof String) {
        this.alert = response
      }
    },
    forget (event) {
      event.preventDefault()
      // Buttons Actions
      this.loadingButton = true
      this.disabledButton = true
      // Check Values
      let check = false
      if (this.form.email) { check += this.rules.email(this.form.email) }
      check += this.rules.required(this.form.email, 'Correo electronico')
      // Set Post
      if (typeof check === 'string' || check instanceof String || check < 2) {
        // Buttons Actions
        this.loadingButton = false
        this.disabledButton = false
        return
      } else {
        this.loadingButton = true
        this.disabledButton = true
      }

      this.alert = ''

      this.$store
        .dispatch(`forget`, this.form)
        .then((response) => {
          if (response.status === 200 && response.data.code === 100) {
            this.success = response.data.data.message
          } else {
            this.alert = response.data.data.message
          }
          // this.loadingButton = false
        })
        .catch((error) => {
          this.errors.push(error)
          if (error.response) {
            if (error.response.status === 400) {
              this.alert = error.response.data.data.message
            }
          }
        })
      this.loadingButton = false
      this.disabledButton = false
    },
    recovery (event) {
      event.preventDefault()
      // Buttons Actions
      this.loadingButton = true
      this.disabledButton = true
      // Check Values
      let check = false
      check += this.rules.passwordRepet(this.form.passwordRepet)
      check += this.rules.password(this.form.password)
      // Set Post
      if (typeof check === 'string' || check instanceof String || check < 2) {
        // Buttons Actions
        this.loadingButton = false
        this.disabledButton = false
        return
      } else {
        this.loadingButton = true
        this.disabledButton = true
      }

      this.alert = ''

      this.$store
        .dispatch(`recovery`, this.form)
        .then((response) => {
          if (response.status === 200 && response.data.code === 100) {
            this.success = response.data.data.message
          } else {
            this.alert = response.data.data.message
          }
          // this.loadingButton = false
        })
        .catch((error) => {
          this.errors.push(error)
          if (error.response) {
            if (error.response.status === 400) {
              this.alert = error.response.data.data.message
            }
          }
        })
      this.loadingButton = false
      this.disabledButton = false
    },
    validateCode (event) {
      event.preventDefault()
      // Buttons Actions
      this.loadingButton = true
      this.disabledButton = true
      // Check Values
      let check = false
      check += this.rules.required(this.code.one, 'Código #1')
      check += this.rules.required(this.code.one, 'Código #2')
      check += this.rules.required(this.code.one, 'Código #3')
      check += this.rules.required(this.code.one, 'Código #4')
      // Set Post
      if (typeof check === 'string' || check instanceof String || check < 4) {
        // Buttons Actions
        this.loadingButton = false
        this.disabledButton = false
        return
      } else {
        this.loadingButton = true
        this.disabledButton = true
      }

      this.alert = ''
      this.form.code = this.code.one + this.code.two + this.code.three + this.code.four
      this.$store
        .dispatch(`validateCode`, this.form)
        .then((response) => {
          console.log(response)
          if (response.status === 200 && response.data.code === 100) {
            this.success = response.data.data.message

            // this.$router.push({ path: '/onboarding/forget', force: true, params: { step: false } })
          } else {
            this.alert = response.data.data.message
          }
          // this.loadingButton = false
        })
        .catch((error) => {
          this.errors.push(error)
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
  color: white !important;

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

.set-white {
  margin: auto 10px;
  color: white !important;
  text-align: center;
}

.set-white-exception {
  width: 20px;
  margin: auto 10px;
  color: white !important;
  text-align: center;
}

::-webkit-input-placeholder { /* Edge */
  color: white !important;
  text-align: center;
}

:-ms-input-placeholder { /* Internet Explorer */
  color: white !important;
  text-align: center;
}

::placeholder {
  color: white !important;
  text-align: center;
}

label, .v-label {
  color: white !important;
  text-align: center;
}

label.v-label.theme--dark {
    margin: 0 auto;
    width: -webkit-fill-available;
}
</style>
