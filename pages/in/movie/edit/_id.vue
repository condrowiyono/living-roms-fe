<template>
  <div>
    <b-overlay
      :show="isFetchingMovie"
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

export default {
  name: 'EditShow',

  components: {
    BButton,
    BOverlay,
    MovieForm
  },

  data () {
    return {
      form: {
        banners: [],
        budget: 0,
        genres: [],
        homepage: '',
        tmdb_id: 0,
        imdb_id: '',
        original_language: '',
        original_title: '',
        popularity: 0,
        posters: [],
        release_date: '',
        revenue: 0,
        runtime: 0,
        language: [],
        status: '',
        tagline: '',
        title: '',
        vote_average: 0,
        vote_count: 0,
        imdb_rating: 0,
        awards: '',
        actors: [],
        countries: [],
        crews: [],
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
      isFetchingMovie: 'movie/isFetchingMovie'
    })
  },

  async mounted () {
    await this.handleFetchMovieDetail(this.$route.params.id)
    this.$store.commit('common/SET_HEADER', `${this.form.title}`)
  },

  methods: {
    ...mapActions({
      fetchMovieDetail: 'movie/FETCH_MOVIE',
      updateMovie: 'movie/UPDATE_MOVIE'
    }),

    async handleFetchMovieDetail (id) {
      const response = await this.fetchMovieDetail(id)
      const data = response.data

      this.form.title = data.title
      this.form.banners = data.banners.length ? data.banners.map(banner => (banner)) : []
      this.form.genres = data.genres.length ? data.genres.map(genre => (genre.name)) : []
      this.form.tmdb_id = data.tmdb_id
      this.form.imdb_id = data.imdb_id
      this.form.original_language = data.original_language
      this.form.posters = data.posters.length ? data.posters.map(poster => (poster)) : []
      this.form.release_date = data.release_date
      this.form.runtime = data.runtime
      this.form.imdb_rating = data.imdb_rating
      this.form.awards = data.awards
      this.form.actors = data.actors
      this.form.countries = data.countries.length ? data.countries.map(country => (country.name)) : []
      this.form.productions = data.productions.length ? data.productions.map(production => (production.name)) : []
      this.form.rated = data.rated
      this.form.videos = data.videos.length ? data.videos.map(video => (video)) : []
      this.form.director = data.director
      this.form.player.type = data.player.type
      this.form.player.source = data.player.source
      this.form.player.player_url = data.player.player_url
      this.form.overview = data.overview
    },

    async handleSubmit () {
      const id = this.$route.params.id
      const payload = {
        ...this.form,
        genres: this.form.genres.map(item => ({ name: item })),
        productions: this.form.productions.map(item => ({ name: item })),
        countries: this.form.countries.map(item => ({ name: item }))
      }
      await this.updateMovie({ id, payload })

      this.$router.push({
        name: 'in-movie'
      })
    }
  }
}
</script>
