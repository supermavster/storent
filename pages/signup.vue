<template>
  <v-layout>
    <v-flex class="text-center">
      <v-subheader>Standard</v-subheader>

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
        <div style>
          <v-text-field
            v-model="form.name"
            color="white"
            label="Nombre"
            required
          />
          <v-text-field
            v-model="form.lastName"
            color="white"
            label="Apellidos"
            required
          />
          <v-text-field
            v-model="form.email"
            color="white"
            label="Correo electronico"
            required
          />
          <v-text-field
            v-model="form.phone"
            :rules="[rules.number]"
            single-line
            color="white"
            label="Celular"
            required
          />
          <v-text-field
            v-model="form.password"
            :rules="[rules.password]"
            color="white"
            label="Contraseña"
            required
          />
          <v-text-field
            v-model="form.passwordRepet"
            :rules="[rules.password, rules.passwordRepet]"
            color="white"
            label="Confirmar contraseña"
            required
          />
          <v-checkbox
            v-model="form.checkbox"
            :rules="[rules.required]"
            value="1"
            label="Option"
            data-vv-name="checkbox"
            type="checkbox"
            required
          />
        </div>
        <!-- Register -->
        <div style="display:none">
          <v-text-field label="NIT" required />
          <v-text-field label="NIT EXT" required />
          <v-text-field label="Razon Social" required />
          <v-text-field label="Dirección" required />
          <v-text-field label="Celular/Teléfono de la Compañia" required />
          <v-text-field label="E-Mail de la Compañia" required />
          <v-text-field label="Web Site" required />
          <v-text-field label="PEP" required />
          <v-text-field label="CIIU" required />
          <v-text-field label="Descripción" required />
          <v-text-field label="Tipo de Compañia" required />
          <v-menu transition="slide-y-transition">
            <template>
              <v-btn color="white" class="ma-2">
                Slide Y Transition
              </v-btn>
            </template>
            <v-list>
              <v-list-item link>
                <v-list-item-title />
              </v-list-item>
            </v-list>
          </v-menu>
          <v-text-field label="ID Ciudad" required />
        </div>
        <v-btn class="mr-4">
          Registrar
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
      // Form
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
        required: (value) => {
          const response =
            !!value || 'Este campo es requerido.'
          if (typeof response === 'string' || response instanceof String) { this.alert = response }
          return response
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const response =
            pattern.test(value) || 'Correo electronico invalido.'
          if (typeof response === 'string' || response instanceof String) { this.alert = response }
          return response
        },
        number: (value) => {
          const pattern = /^[0-9]+$/
          const response =
            pattern.test(value) ||
            'Este campo debe contener valores númericos.'
          if (typeof response === 'string' || response instanceof String) { this.alert = response }
          return response
        },
        password: (value) => {
          const pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
          const response =
            pattern.test(value) ||
            'La contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
          if (typeof response === 'string' || response instanceof String) { this.alert = response }
          return response
        },
        passwordRepet: (value) => {
          const checkValues = value === this.form.password
          const response =
            checkValues ||
            'La contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
          if (typeof response === 'string' || response instanceof String) { this.alert = response }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: grey;
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: grey;
}
</style>
