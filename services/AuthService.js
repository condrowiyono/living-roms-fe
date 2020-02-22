export default class authService {
  constructor (httpService) {
    this._http = httpService
  }

  async login (payload) {
    const { data } = await this._http.post('/login', payload)

    return data.data
  }

  async me () {
    const { data } = await this._http.get('/me')

    return data.data
  }
}
