import axios from 'axios'

const baseURL = 'http://localhost:9000'

const OPTIONS = {
  baseURL,
  timeout: 20000,
  headers: {}
}

const livingXios = axios.create(OPTIONS)

export default livingXios
