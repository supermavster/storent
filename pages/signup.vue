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
        <div style>
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
              required
              style="height:25px"
            />
            <v-btn text small color="primary" class="mx-5">
              Leer terminos y condiciones
            </v-btn>
          </v-col>
        </div>
        <!-- Continue -->
        <v-btn
          id="register-user"
          :disabled="disabledButton"
          :loading="loadingButton"
          class="mr-4"
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
  layout: 'signup',
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
      // Check Values
      let check = false
      check += this.rules.passwordRepet(this.form.passwordRepet)
      check += this.rules.password(this.form.password)
      check += this.rules.number(this.form.phone, 'Telefóno')
      check += this.rules.email(this.form.email)
      check += this.rules.required(this.form.lastName, 'Apellidos')
      check += this.rules.required(this.form.name, 'Nombre')
      // Set Post
      if (typeof check === 'string' || check instanceof String || check < 6) {
        this.disabledButton = false
        return
      }

      this.loadingButton = true
      this.disabledButton = true
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
            this.$router.push({ path: '/signup-intro-company', force: true })
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
          this.loadingButton = false
          this.disabledButton = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-application .white--text {
  color: gray !important;
  caret-color: gray !important;
}
</style>
