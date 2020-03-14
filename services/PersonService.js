export default class sampleLinkService {
  constructor (httpService) {
    this._http = httpService
  }

  async get (query) {
    const { data } = await this._http.get('/person', query)

    return data
  }
}
