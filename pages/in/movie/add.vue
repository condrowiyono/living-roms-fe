<template>
  <div>
    <movie-search-input
      v-model="tmdbQuery"
      @select-movie="handleFetchMovieDetail"
    />
    <b-overlay
      :show="isFetchingDetail"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
    >
      <form
        @submit.prevent="handleSubmit"
        class="mt-5"
      >
        <movie-form
          :value="form"
        />
        <b-button
          type="submit"
          variant="primary"
        >
          Save
        </b-button>
      </form>
    </b-overlay>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import {
  BButton,
  BOverlay
} from 'bootstrap-vue'

import MovieForm from '~/components/organism/MovieForm'
import MovieSearchInput from '~/components/molecules/MovieSearchInput'

export default {
  name: 'AddShow',

  components: {
    BButton,
    BOverlay,
    MovieSearchInput,
    MovieForm
  },

  data () {
    return {
      tmdbQuery: '',
      form: {
        banners: [],
        overview: '',
        genres: [],
        tmdb_id: 0,
        imdb_id: '',
        original_language: '',
        posters: [],
        release_date: '',
        runtime: 0,
        language: [],
        title: '',
        imdb_rating: 0,
        awards: '',
        actors: [],
        countries: [],
        rated: '',
        videos: [],
        director: '',
        player: {
          type: 'movie',
          source: '',
          player_url: ''
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      isSearching: 'tmdb/isSearching',
      results: 'tmdb/results',
      movieDetail: 'tmdb/movieDetail',
      isFetchingDetail: 'tmdb/isFetchingDetail'
    })
  },

  watch: {
    tmdbQuery (val) {
      if (val.length > 3) {
        this.searchMovie({ query: val })
      }
    }
  },

  created () {
    this.$store.commit('common/SET_HEADER', 'Buat Baru')
  },

  methods: {
    ...mapActions({
      searchMovie: 'tmdb/TMDB_SEARCH_MOVIE',
      fetchMovieDetail: 'tmdb/TMDB_MOVIE_DETAIL',
      createMovie: 'movie/CREATE_MOVIE'
    }),

    async handleSearchMovie (query) {
      await this.searchMovie({ query: this.searchQuery })
    },

    async handleFetchMovieDetail (id) {
      const { data } = await this.fetchMovieDetail(id)

      this.form = {
        banners: [{ path: `https://image.tmdb.org/t/p/w780${data.backdrop_path}` }],
        genres: data.genres.map(item => item.name),
        tmdb_id: data.id,
        imdb_id: data.imdb_id,
        original_language: data.original_language,
        overview: data.overview,
        posters: [{ path: `https://image.tmdb.org/t/p/w185_and_h278_bestv2${data.poster_path}` }],
        release_date: data.release_date,
        runtime: data.runtime,
        countries: data.production_countries.map(item => item.name),
        productions: data.production_companies.map(item => item.name),
        title: data.title,
        imdb_rating: data.imdb_rating,
        awards: data.awards,
        actors: data.actors,
        rated: data.rated,
        director: data.director,
        videos: data.videos.map((item) => {
          if (item.site === 'YouTube') {
            return {
              source: 'youtube',
              type: item.type,
              player_url: `https://www.youtube-nocookie.com/embed/${item.key}`
            }
          }
        }),
        player: {
          type: 'movie',
          source: 'gdriveplayerus',
          player_url: `https://database.gdriveplayer.us/player.php?imdb=${data.imdb_id}`
        }
      }
    },

    async handleSubmit () {
      const payload = {
        ...this.form,
        genres: this.form.genres.map(item => ({ name: item })),
        productions: this.form.productions.map(item => ({ name: item })),
        countries: this.form.countries.map(item => ({ name: item }))
      }
      await this.createMovie(payload)

      this.$router.push({
        name: 'in-movie'
      })
    }
  }
}
</script>
