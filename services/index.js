import axios from './livingXios'
import HttpService from './HttpService'
import SampleLinkService from './SampleLinkService'
import ShowService from './ShowService'
import AuthService from './AuthService'
import TMDBService from './TMDBService'

export const httpService = new HttpService(axios)
export const sampleLinkService = new SampleLinkService(httpService)
export const showService = new ShowService(httpService)
export const authService = new AuthService(httpService)
export const tmdbService = new TMDBService(httpService)
