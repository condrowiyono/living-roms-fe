export default class sampleLinkService {
  constructor (httpService) {
    this._http = httpService
  }

  async searchMovie (query) {
    const { data } = await this._http.get('/partner/tmdb/movie-search', query)

    return data
  }

  async getMovieDetail (tmdb) {
    const { data } = await this._http.get('/partner/tmdb/movie-detail', { tmdb })

    return data
  }

  async getMovieImage (query) {
    const { data } = await this._http.get('/partner/tmdb/movie-image', query)

    return data
  }
}
