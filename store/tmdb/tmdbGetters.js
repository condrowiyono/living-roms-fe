export default {
  isSearching: state => state.isSearching,
  searchingError: state => state.searchingError,
  isFetchingDetail: state => state.isFetchingDetail,
  fetchingDetailError: state => state.fetchingDetailError,

  results: state => state.results,
  movieDetail: state => state.movieDetail,
  movieImage: state => state.movieImage
}
