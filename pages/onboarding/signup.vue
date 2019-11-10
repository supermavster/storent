<template>
  <v-layout>
    <v-flex class="text-center">
      <!--  Error Elements -->
      <div>
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
      <v-col class="text-center" cols="12" sm="12">
        <h1 class="title-storent text-center">
          Usuario nuevo
        </h1>
        <div>
          <v-text-field
            v-model="form.name"
            single-line
            color="white"
            label="Nombre"
            required
            :rules="[rules.requiredSingle]"
          />
          <v-text-field
            v-model="form.lastName"
            single-line
            color="white"
            label="Apellidos"
            required
            :rules="[rules.requiredSingle]"
          />
          <v-text-field
            v-model="form.email"
            single-line
            color="white"
            label="Correo electronico"
            required
            :rules="[rules.requiredSingle]"
          />
          <v-text-field
            v-model="form.phone"
            single-line
            color="white"
            label="Celular"
            required
            :rules="[rules.requiredSingle]"
          />
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
          <v-col class="text-left" cols="12" sm="12">
            <v-checkbox
              v-model="form.checkbox"
              single-line
              value="1"
              label="Acepta términos y condiciones"
              data-vv-name="checkbox"
              type="checkbox"
              class="color-check"
              required
              style="height:25px; margin:0"
            />
            <v-btn text small class="color-link mx-5">
              Leer terminos y condiciones
            </v-btn>
          </v-col>
        </div>
        <!-- Continue -->
        <v-btn
          id="register-user"
          class="btn-storent-main mr-4"
          :disabled="disabledButton"
          :loading="loadingButton"
          @click="registerUser($event)"
        >
          Continuar
        </v-btn>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
// import { ValidationProvider, extend } from 'vee-validate'

export default {
  layout: 'onboarding/signup',
  data () {
    return {
      errors: [],
      alert: '',
      success: '',
      // Form
      disabledButton: false,
      loadingButton: false,
      showPassword: false,
      form: {
        // Tokens
        accessToken: null,
        authToken: null,
        // Data User
        uid: null,
        name: null,
        lastName: null,
        email: null,
        phone: null,
        checkbox: null
      },
      // Validation
      rules: {
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
        number: (value, field) => {
          const pattern = /^[0-9]+$/
          const response =
            pattern.test(value) ||
            'El ' + field + ' debe contener valores númericos.'
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
        },
        check: () => {
          // console.log(this.form.checkbox === '1')
          const checkValues = this.form.checkbox === '1'
          let response = checkValues || 'Debe aceptar terminos y condiciones.'
          if (response === 'Debe aceptar terminos y condiciones.') {
            this.showAlert(response)
            response = false
          } else {
            response = true
          }
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
    registerUser (event) {
      event.preventDefault()

      this.loadingButton = true
      this.disabledButton = true

      // Check Values
      let check = false
      check += this.rules.check()
      check += this.rules.passwordRepet(this.form.passwordRepet)
      check += this.rules.password(this.form.password)
      check += this.rules.number(this.form.phone, 'Celular')
      check += this.rules.email(this.form.email)
      check += this.rules.required(this.form.lastName, 'Apellidos')
      check += this.rules.required(this.form.name, 'Nombre')

      // Set Post
      if (typeof check === 'string' || check instanceof String || check < 7) {
        this.loadingButton = false
        this.disabledButton = false
        return
      } else {
        this.loadingButton = true
        this.disabledButton = true
      }

      this.alert = ''

      this.$store
        .dispatch(`register`, this.form)
        .then((response) => {
          if (response.code === 100) {
            // Get Access Token
            this.$cookie.set('uid', response.data.uid)
            this.uid = response.data.uid
            this.success = response.data.message
            // console.log(response)
            // Change View
            this.$router.push({ path: '/onboarding/signup-intro-company', force: true })
          } else {
            this.alert = response.data.message
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
.v-application .white--text {
  color: gray !important;
  caret-color: gray !important;
}

.title-storent {
  color: black !important;
  position: relative;
  font-size: 2rem;
}

a {
  font-size: 15px;
  text-decoration: none;
  color: $main-color;
}

.color-link {
  color: $main-color;
}

.btn-storent-main {
  font-size: 0.8rem;
  height: 45px !important;
  width: 200px !important;
}

.v-application .accent--text, .v-input--selection-controls__ripple.accent--text {
    color: $main-color;
    caret-color: $main-color;
}

.color-check {
    color: $main-color;
    caret-color: $main-color;
}

.v-icon, .v-icon.v-icon {
  color: $main-color;
}
</style>
