export default class imageService {
  constructor (httpService) {
    this._http = httpService
  }

  async duckduckgo (query) {
    const { data } = await this._http.get('/image/duckduckgo/image-search', query)

    return data
  }
}
