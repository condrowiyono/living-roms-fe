import axios from 'axios'

const baseURL = 'http://localhost:9000'
const token = window.localStorage.getItem('token')

const OPTIONS = {
  baseURL,
  timeout: 20000,
  headers: {
    'Authorization' : `Bearer ${token}`  // eslint-disable-line
  }
}

const livingXios = axios.create(OPTIONS)

export default livingXios
