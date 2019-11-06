import axios from 'axios'

export const strict = false

const nameHeaders = [
  'X-' + process.env.SHORT_NAME + '-Access-Token',
  'X-' + process.env.SHORT_NAME + '-Auth-Token'
]

export const state = () => ({
  accessToken: '',
  authToken: false,
  layout: 'default'
})

export const mutations = {
  SET_LAYOUT (state, payload) {
    state.layout = payload
  }
}

export const getters = {
  getAccessToken: (state) => {
    return state.accessToken
  },
  getAuthToken: (state) => {
    return state.authToken
  },
  layout (state) {
    return state.layout
  }
}

export const actions = {
  getAccessToken () {
    // const self = this
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.URL_API + 'auth/generate-access-token')
        .then((response) => {
          // Get Access Token
          const accessToken = response.data.data.accessToken
          state.accessToken = accessToken
          resolve(accessToken)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  nuxtServerInit (vuexContext) {
    this.self = this
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  makeHeader (position, value) {
    const config = {
      headers: {
        tempHeader: value
      }
    }
    Object.defineProperty(
      config.headers,
      nameHeaders[position],
      Object.getOwnPropertyDescriptor(config.headers, 'tempHeader')
    )
    delete config.headers.tempHeader
    return config
  },
  login (vuexContext, form) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, form.accessToken) // Access Token
      // Create formdata
      const dataSend = new FormData()
      dataSend.append('email', form.email)
      dataSend.append('password', form.password)
      dataSend.append('serviceId', 5)
      dataSend.append('version', process.env.VERSION)

      // Make Actions
      axios
        .post(process.env.URL_API + 'auth/login', dataSend, config)
        .then(function (json) {
          resolve(json)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  register (vuexContext, form) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, form.accessToken) // Access Token
      // /*Create formdata*/
      const dataSend = new FormData()
      dataSend.append('name', form.name)
      dataSend.append('lastName', form.lastName)
      dataSend.append('email', form.email)
      dataSend.append('phone', form.phone)
      dataSend.append('password', form.password)
      axios
        .post(process.env.URL_API + 'auth/register/user', dataSend, config)
        .then(function (json) {
          // console.log(json)
          resolve(json.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  registerCompany (vuexContext, form) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, form.accessToken) // Access Token
      // /*Create formdata*/
      const dataSend = new FormData()
      dataSend.append('uid', '2c727f2550ac4817fafaa0e99e80f2a8')
      dataSend.append('nit', '8888888888')
      dataSend.append('nitExt', '1')
      dataSend.append('bussinessName', 'Kubo S.A.S.')
      dataSend.append('address', 'Calle falsa 123')
      dataSend.append('phoneCompany', '3122333444')
      dataSend.append('emailCompany', 'miguel@kubo.co')
      dataSend.append('website', 'kubo.co')
      dataSend.append('pep', '1')
      dataSend.append('ciiu', '80')
      dataSend.append(
        'description',
        'Incidunt qui et sit natus mollitia sit impedit optio. Magni voluptas occaecati enim cupiditate accusantium doloremque. Amet ab et officia qui quia laboriosam et quos. Ut iste ea voluptatem consequatur. Non corporis qui ut. Veniam sit non sed similique debitis voluptatibus. Atque dolor ex laborum. Cumque dicta aut eum laborum possimus atque voluptatum. Libero sint consequuntur voluptatem molestias quas. Non ut sed non aliquid quod omnis rerum. Ea sit non libero soluta alias.'
      )
      dataSend.append('typeCompanyId', '2')
      dataSend.append('cityId', '9609540')
      axios
        .post(process.env.URL_API + 'auth/register/company', dataSend, config)
        .then(function (json) {
          resolve(json.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // Countries
  countries (vuexContext, accessToken) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, accessToken) // Access Token
      axios
        .get(process.env.URL_API + 'location/countries', config)
        .then(function (json) {
          resolve(json.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  states (vuexContext, data) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, data.accessToken) // Access Token
      axios
        .get(process.env.URL_API + 'location/country/' + data.countryId, config)
        .then(function (json) {
          resolve(json.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  cities (vuexContext, data) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, data.accessToken) // Access Token
      axios
        .get(process.env.URL_API + 'location/state/' + data.stateId, config)
        .then(function (json) {
          resolve(json.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
