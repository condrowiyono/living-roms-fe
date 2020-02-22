export default class sampleLinkService {
  constructor (httpService) {
    this._http = httpService
  }

  async getSampleLinks (query) {
    const { data } = await this._http.get('/sample-link', query)

    return data
  }
}
