export default class imageService {
  constructor (httpService) {
    this._http = httpService
  }

  async duckduckgo (query) {
    const { data } = await this._http.get('/partner/duckduckgo/image-search', query)

    return data
  }

  async google (query) {
    const { data } = await this._http.get('/partner/google/image-search', query)

    return data
  }

  async upload (file) {
    const form = new FormData()
    form.append('file', file)
    form.append('name', 'asds')

    console.warn(form)

    const { data } = await this._http.post('/image/upload-image', form)

    return data
  }
}
