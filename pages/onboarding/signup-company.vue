<template>
  <v-layout style="position: relative">
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
        <v-alert v-if="success !== ''" type="success" transition="scale-transition">
          {{ success }}
        </v-alert>
      </div>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <div class="mx-2">
              No. de Identificación - NIT
              <v-row align="center" justify="center">
                <v-text-field
                  v-model="form.nit"
                  single-line
                  color="white"
                  label="000000000"
                  required
                  :rules="[rules.requiredSingle]"
                />
                <span class="mx-4">-</span>
                <v-text-field
                  v-model="form.nitExt"
                  single-line
                  color="white"
                  label="0000"
                  required
                  :rules="[rules.requiredSingle]"
                />
              </v-row>
              <v-text-field
                v-model="form.bussinessName"
                single-line
                color="white"
                label="Razón Social de la empresa"
                required
                :rules="[rules.requiredSingle]"
              />
              <v-text-field
                v-model="form.address"
                single-line
                color="white"
                label="Domicilio"
                required
                :rules="[rules.requiredSingle]"
              />
              <v-text-field
                v-model="form.phoneCompany"
                single-line
                color="white"
                label="Teléfono / Celular"
                required
                :rules="[rules.requiredSingle]"
              />
              <v-select
                v-model="form.location.country"
                :items="location.countries"
                item-text="name"
                item-value="countryId"
                label="Paises"
                persistent-hint
                return-object
                single-line
                @change="getStates"
              />
              <v-row align="center" justify="center">
                <!-- States -->
                <v-select v-if="!location.states" disabled label="Departamentos" class="mx-2" />
                <v-select
                  v-else
                  v-model="form.location.state"
                  :items="location.states"
                  item-text="name"
                  item-value="stateId"
                  label="Departamentos"
                  persistent-hint
                  return-object
                  single-line
                  class="mx-2"
                  @change="getCities"
                />
                <!-- Cities -->
                <v-select v-if="!location.cities" disabled label="Ciudades" class="mx-2" />
                <v-select
                  v-else
                  v-model="form.location.city"
                  :items="location.cities"
                  item-text="name"
                  item-value="cityId"
                  label="Ciudades"
                  persistent-hint
                  return-object
                  single-line
                  class="mx-2"
                />
              </v-row>
              <v-text-field
                v-model="form.website"
                single-line
                color="white"
                label="Paginá Web"
                required
                :rules="[rules.requiredSingle]"
              />
              <v-text-field
                v-model="form.emailCompany"
                single-line
                color="white"
                label="Corre electronico"
                required
                :rules="[rules.requiredSingle]"
              />
            </div>
            <div class="mx-2">
              <v-file-input label="File input" />Calidad tributaria y Calidad económica CIIU
              <br>Código CIIU
              <v-text-field
                v-model="form.ciiu"
                single-line
                color="white"
                label="00000000000"
                required
                :rules="[rules.requiredSingle]"
              />
              <v-textarea v-model="form.description" label="Descripción de la empresa" />
              <br>Es usted persona expuesta publicamente? - PEP
              <v-row align="center" justify="center">
                <v-checkbox
                  v-model="pep.yes"
                  :value="!pep.no"
                  class="mx-2"
                  label="Sí"
                />
                <v-checkbox
                  v-model="pep.no"
                  :value="!pep.yes"
                  class="mx-2"
                  label="No"
                />
              </v-row>
            </div>
          </v-row>
          <v-row align="center" justify="center">
            <v-file-input label="File input" />
            <v-file-input label="File input" />
            <v-file-input label="File input" />
          </v-row>
          <v-row align="center" justify="center">
            <!-- Continue -->
            <v-btn
              id="register-user"
              :disabled="disabledButton"
              :loading="loadingButton"
              class="mr-4"
              @click="registerCompany($event)"
            >
              Continuar
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
      // Temp
      pep: {
        yes: true,
        no: false,
        check: {
          yes: null,
          no: null
        }
      },
      form: {
        // Tokens
        accessToken: null,
        authToken: null,
        // Data User
        uid: null,
        nit: null,
        nitExt: null,
        bussinessName: null,
        address: null,
        phoneCompany: null,
        website: null,
        emailCompany: null,
        pep: null,
        ciiu: null,
        description: null,
        typeCompanyId: null,
        cityId: null,
        // location
        location: {
          country: null,
          state: null,
          city: null
        }
      },
      // Countries
      location: {
        select: {
          countries: { countryId: '3686110', name: 'Colombia' },
          states: { stateId: '3688685', name: 'Bogotá D.C' },
          cities: { cityId: '9609540', name: 'Bogotá D.C.' }
        },
        countries: null,
        states: null,
        cities: null
      },
      // Validation
      rules: {
        requiredSingle: (value) => {
          const response = !!value || 'Este campo es requerido.'
          return response
        },
        requiredCustome: (value, field) => {
          const response = !!value || field
          this.showAlert(response)
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
      this.getCountries()
    },
    showAlert (response) {
      if (typeof response === 'string' || response instanceof String) {
        this.alert = response
      }
    },
    getCountries () {
      this.$store
        .dispatch(`countries`, this.form.accessToken)
        .then((response) => {
          if (response.code === 100) {
            // Get Data
            this.location.countries = response.data
          } else {
            this.alert = response.data.message
          }
        })
        .catch((error) => {
          this.errors.push(error)
          if (error.response) {
            if (error.response.status === 400) {
              this.alert = error.response.data.data.message
            }
          }
        })
    },
    getStates () {
      const data = {
        accessToken: this.form.accessToken,
        countryId: this.form.location.country.countryId
      }
      this.$store
        .dispatch(`states`, data)
        .then((response) => {
          // Get Data
          if (response.code === 100) {
            // Get Data
            this.location.states = response.data
          } else {
            this.alert = response.data.message
          }
        })
        .catch((error) => {
          this.errors.push(error)
          if (error.response) {
            if (error.response.status === 400) {
              this.alert = error.response.data.data.message
            }
          }
        })
    },
    getCities () {
      const data = {
        accessToken: this.form.accessToken,
        stateId: this.form.location.state.stateId
      }
      this.$store
        .dispatch(`cities`, data)
        .then((response) => {
          // Get Data
          if (response.code === 100) {
            // Get Data
            this.location.cities = response.data
          } else {
            this.alert = response.data.message
          }
        })
        .catch((error) => {
          this.errors.push(error)
          if (error.response) {
            if (error.response.status === 400) {
              this.alert = error.response.data.data.message
            }
          }
        })
    },
    pepCheck () {
      if (this.pep.no === null) {
        this.pep.no = false
      }

      if (this.pep.yes === null) {
        this.pep.yes = false
      }

      if (this.pep.yes) {
        this.pep.no = !this.pep.yes
      }

      if (this.pep.no) {
        this.pep.yes = !this.pep.no
      }

      if (this.pep.yes === this.pep.no) {
        this.pep.check.yes = true
        this.pep.check.no = false
      }

      this.pep.check.yes = this.pep.yes
      this.pep.check.no = this.pep.no
      // console.log(this.pep)
    },
    registerCompany (event) {
      event.preventDefault()
      // Check Values
      let check = false
      check += this.rules.requiredCustome(
        this.form.location.cities,
        'La Ciudad es requerida.'
      )
      check += this.rules.email(this.form.emailCompany)
      check += this.rules.required(
        this.form.emailCompany,
        'Correo Electronico'
      )
      check += this.rules.number(this.form.phoneCompany, 'Teléfono / Celular')
      check += this.rules.required(this.form.address, 'Domicilio')
      check += this.rules.required(this.form.bussinessName, 'Razón Social')
      check += this.rules.number(this.form.nitExt, 'Nit - Ext')
      check += this.rules.number(this.form.nit, 'Nit')

      // website:kubo.co
      // pep:1
      // ciiu:80
      // description:Incidunt qui et sit natus mollitia sit impedit optio. Magni voluptas occaecati enim cupiditate accusantium doloremque. Amet ab et officia qui quia laboriosam et quos. Ut iste ea voluptatem consequatur. Non corporis qui ut. Veniam sit non sed similique debitis voluptatibus. Atque dolor ex laborum. Cumque dicta aut eum laborum possimus atque voluptatum. Libero sint consequuntur voluptatem molestias quas. Non ut sed non aliquid quod omnis rerum. Ea sit non libero soluta alias.
      // typeCompanyId:2
      // cityId:9609540
      // Set Post
      if (typeof check === 'string' || check instanceof String || check < 6) {
        this.disabledButton = false
        return
      }

      // Data
      this.form.uid = this.$cookie.get('uid')
      this.form.cityId = this.form.location.city.cityId

      this.loadingButton = true
      this.disabledButton = true
      this.$store
        .dispatch(`registerCompany`, this.form)
        .then((response) => {
          if (response.code === 100) {
            // Get Access Token
            // this.uid = response.data
            this.success = response.data.message
            // console.log(response)
            // Change View
            // this.$router.push({ path: '/signup-intro-company', force: true })
          } else {
            this.alert = response.data.message
          }
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
