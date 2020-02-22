<template>
  <div>
    <b-form-group
      label="Cari judul:"
    >
      <b-form-input
        v-model="searchQuery"
        v-on:keyup.enter="handleSearchMovie"
        placeholder="Title"
        debounce="500"
      />
    </b-form-group>
    <div v-if="isSearching" class="w-full flex justify-center">
      <div class="text-center">
        <b-spinner variant="primary" />
      </div>
    </div>
    <div v-else>
      <b-card-group deck>
        <b-card
          v-for="movie in top5Result()"
          :key="movie.id"
          :title="movie.title"
          :img-src="`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`"
          :img-alt="movie.title"
          @click="handleFetchMovieDetail(movie.id)"
          img-top
          class="cursor-pointer"
        >
          <template v-slot:footer>
            <small class="text-muted">{{ movie.release_date }}</small>
          </template>
        </b-card>
      </b-card-group>
    </div>
    <form @submit.prevent="handleSubmit">
      <b-form-group
        label="Title:"
      >
        <b-form-input
          v-model="form.Title"
          placeholder="Title"
        />
      </b-form-group>
      <b-form-group>
        <b-button
          type="submit"
          variant="primary"
        >
          Save
        </b-button>
      </b-form-group>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddShow',

  data () {
    return {
      searchQuery: '',
      form: {
        Title: ''
      }
    }
  },

  // watch: {
  //   'form.Title': {
  //     async handler (val) {
  //       if (val.length > 3) {
  //         await this.handleSearchMovie(val)
  //       }
  //     },
  //     deep: true
  //   }
  // },

  computed: {
    ...mapGetters({
      isSearching: 'tmdb/isSearching',
      results: 'tmdb/results',
      movieDetail: 'tmdb/movieDetail'
    })
  },

  created () {
    this.$store.commit('common/SET_HEADER', 'Buat Baru')
  },

  methods: {
    ...mapActions({
      searchMovie: 'tmdb/TMDB_SEARCH_MOVIE',
      fetchMovieDetail: 'tmdb/TMDB_MOVIE_DETAIL'
    }),

    async handleSearchMovie (query) {
      await this.searchMovie({ query: this.searchQuery })
    },

    async handleFetchMovieDetail (id) {
      const { data } = await this.fetchMovieDetail(id)
      this.form = {
        Title: data.title
      }
    },

    top5Result () {
      return this.results
        ? this.results.slice(0, 7)
        : []
    }
  }
}
</script>
