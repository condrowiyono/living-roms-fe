import axios from './livingXios'
import HttpService from './HttpService'
import MovieService from './MovieService'
import AuthService from './AuthService'
import TMDBService from './TMDBService'
import ImageService from './ImageService'
import PersonService from './PersonService'

export const httpService = new HttpService(axios)
export const movieService = new MovieService(httpService)
export const authService = new AuthService(httpService)
export const tmdbService = new TMDBService(httpService)
export const imageService = new ImageService(httpService)
export const personService = new PersonService(httpService)
