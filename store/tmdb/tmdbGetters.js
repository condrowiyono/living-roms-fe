export default {
  isSearching: state => state.isSearching,
  searchingError: state => state.searchingError,
  isFetchingMovie: state => state.isFetchingMovie,
  fetchingMovieError: state => state.fetchingMovieError,

  results: state => state.results,
  movieDetail: state => state.movieDetail,
  movieImage: state => state.movieImage
}
