export default class HttpService {
  constructor (axios) {
    this._axios = axios
  }

  get (url, params = {}, responseType = 'json') {
    try {
      return this._axios.request({
        method: 'get',
        url,
        params,
        responseType
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  post (url, data, config = {}) {
    try {
      return this._axios.request({
        method: 'post',
        url,
        data,
        ...config
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  patch (url, data) {
    try {
      return this._axios.request({
        method: 'patch',
        url,
        data
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  put (url, data) {
    try {
      return this._axios.request({
        method: 'put',
        url,
        data
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  delete (url, data = null) {
    try {
      return this._axios.request({
        method: 'delete',
        url,
        data
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
