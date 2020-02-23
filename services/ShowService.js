export default class sampleLinkService {
  constructor (httpService) {
    this._http = httpService
  }

  async getShows (query) {
    const { data } = await this._http.get('/show', query)

    return data
  }

  async getShow (id) {
    const { data } = await this._http.get(`/show/${id}`)

    return data
  }

  async create (payload) {
    const { data } = await this._http.post('/show', payload)

    return data
  }
}
