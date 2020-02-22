export default class sampleLinkService {
  constructor (httpService) {
    this._http = httpService
  }

  async searchMovie (query) {
    const { data } = await this._http.get('/tmdb/search-movie', query)

    return data
  }

  async getMovieDetail (tmdb) {
    const { data } = await this._http.get('/tmdb/movie-detail', { tmdb })

    return data
  }
}
