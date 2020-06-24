import axios from 'axios'

const baseURL = process.env.API_URL
const token = window.localStorage.getItem('token')

const OPTIONS = {
  baseURL,
  timeout: 20000,
  headers: {
    'Authorization' : `Bearer ${token}`  // eslint-disable-line
  }
}

const axiosService = axios.create(OPTIONS)

export default axiosService
