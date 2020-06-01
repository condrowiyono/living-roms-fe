export default class sampleLinkService {
  constructor (httpService) {
    this._http = httpService
  }

  async getMovies (query) {
    const { data } = await this._http.get('/movie', query)

    return data
  }

  async getMovie (id) {
    const { data } = await this._http.get(`/movie/${id}`)

    return data
  }

  async create (payload) {
    const { data } = await this._http.post('/movie', payload)

    return data
  }

  async delete (id) {
    const { data } = await this._http.delete(`/movie/${id}`)

    return data
  }
}
