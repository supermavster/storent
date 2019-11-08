import axios from 'axios'

const nameHeaders = [
  'X-' + process.env.SHORT_NAME + '-Access-Token',
  'X-' + process.env.SHORT_NAME + '-Auth-Token'
]

export const actions = {
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
  // Categories
  categories (vuexContext, accessToken) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, accessToken) // Access Token
      axios
        .get(process.env.URL_API + 'settings/categories', config)
        .then(function (json) {
          resolve(json.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  categoriesProducts (vuexContext, accessToken) {
    return new Promise((resolve, reject) => {
      const config = actions.makeHeader(0, accessToken) // Access Token
      axios
        .get(process.env.URL_API + 'settings/category-products', config)
        .then(function (json) {
          resolve(json.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
