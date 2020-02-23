<template>
  <div>
    <image-chooser
      :show="dialog.poster"
      :title="'Poster'"
      :value="dialog.formPoster"
      @close="handleClosePoster"
      @submit="handleSubmitPoster"
    />
    <image-chooser
      :show="dialog.banner"
      :title="'Banner'"
      :value="dialog.formBanner"
      @close="handleCloseBanner"
      @submit="handleSubmitBanner"
    />
    <link-preview
      :show="dialog.player"
      :title="'Player Preview'"
      :value="dialog.formPlayer"
      @close="handleClosePlayer"
      @submit="handleSubmitPlayer"
    />
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
          v-for="movie in topResult(results, 7)"
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
    <form
      @submit.prevent="handleSubmit"
      class="mt-8"
    >
      <h2 class="text-2xl">
        Show Info
      </h2>
      <b-row>
        <b-col cols="8">
          <b-form-group label="Title">
            <b-form-input
              v-model="form.Title"
              placeholder="Title"
            />
          </b-form-group>
          <b-form-group label="Actors">
            <b-form-input
              v-model="form.Actors"
              placeholder="Actors"
            />
          </b-form-group>
          <b-form-group label="Awards">
            <b-form-input
              v-model="form.Awards"
              placeholder="Awards"
            />
          </b-form-group>
          <b-form-group label="BoxOffice">
            <b-form-input
              v-model="form.BoxOffice"
              placeholder="BoxOffice"
            />
          </b-form-group>
          <b-form-group label="Country">
            <b-form-input
              v-model="form.Country"
              placeholder="Country"
            />
          </b-form-group>
          <b-form-group label="Director">
            <b-form-input
              v-model="form.Director"
              placeholder="Director"
            />
          </b-form-group>
          <b-form-group label="Genre">
            <b-form-input
              v-model="form.Genre"
              placeholder="Genre"
            />
          </b-form-group>
          <b-form-group label="Language">
            <b-form-input
              v-model="form.Language"
              placeholder="Language"
            />
          </b-form-group>
          <b-form-group label="Plot">
            <b-form-textarea
              v-model="form.Plot"
              rows="3"
              max-rows="6"
            />
          </b-form-group>
          <b-form-group label="Rated">
            <b-form-input
              v-model="form.Rated"
              placeholder="Rated"
            />
          </b-form-group>
          <b-form-group label="Released">
            <b-form-input
              v-model="form.Released"
              placeholder="Released"
            />
          </b-form-group>
          <b-form-group label="Runtime">
            <b-form-input
              v-model="form.Runtime"
              placeholder="Runtime"
            />
          </b-form-group>
          <b-form-group label="Type">
            <b-form-input
              v-model="form.Type"
              placeholder="Type"
            />
          </b-form-group>
          <b-form-group label="Website">
            <b-form-input
              v-model="form.Website"
              placeholder="Website"
            />
          </b-form-group>
          <b-form-group label="Writer">
            <b-form-input
              v-model="form.Writer"
              placeholder="Writer"
            />
          </b-form-group>
          <b-form-group label="Year">
            <b-form-input
              v-model="form.Year"
              placeholder="Year"
            />
          </b-form-group>
          <b-form-group label="Trailer">
            <b-form-input
              v-model="form.Trailer"
              placeholder="Trailer"
            />
          </b-form-group>
          <b-form-group label="IMDB">
            <b-form-input
              v-model="form.imdbID"
              placeholder="IMDB"
            />
          </b-form-group>
          <b-form-group label="PlayerURL">
            <b-input-group class="mt-3">
              <template v-slot:append>
                <b-button @click="handleOpenPlayer">
                  <b-icon icon="box-arrow-up-right" />
                </b-button>
              </template>
              <b-form-input
                v-model="form.PlayerURL"
                placeholder="PlayerURL"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <div class="text-center mb-4">
            <b-img-lazy :src="form.Poster" />
            <b-button
              @click="handleOpenPoster"
              class="mt-2"
            >
              Poster
              <b-icon icon="box-arrow-up-right" />
            </b-button>
          </div>
          <div class="text-center mb-4">
            <b-img-lazy :src="form.Banner" />
            <b-button
              @click="handleOpenBanner"
              class="mt-2"
            >
              Banner
              <b-icon icon="box-arrow-up-right" />
            </b-button>
          </div>
        </b-col>
      </b-row>
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
import ImageChooser from '~/components/ImageChooser'
import LinkPreview from '~/components/LinkPreview'

export default {
  name: 'AddShow',

  components: {
    ImageChooser,
    LinkPreview
  },

  data () {
    return {
      searchQuery: '',
      form: {
        Title: '',
        Actors: '',
        Award: '',
        BoxOffice: '',
        Country: '',
        DVD: '',
        Director: '',
        Genre: '',
        Language: '',
        Plot: '',
        Poster: '',
        Production: '',
        Rated: '',
        Released: '',
        Response: '',
        Runtime: '',
        Type: '',
        Website: '',
        Writer: '',
        Year: '',
        imdbID: '',
        imdbRating: '',
        imdbVotes: '',
        Banner: '',
        Trailer: '',
        PlayerURL: ''
      },
      dialog: {
        poster: false,
        banner: false,
        player: false,
        formPoster: {
          url: ''
        },
        formBanner: {
          url: ''
        },
        formPlayer: {
          url: ''
        }
      },
      posterPath: '',
      imageQuery: ''
    }
  },

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
      fetchMovieDetail: 'tmdb/TMDB_MOVIE_DETAIL',
      createShow: 'show/CREATE_SHOW'
    }),

    handleOpenPoster () {
      this.dialog.poster = true
    },

    handleClosePoster () {
      this.dialog.poster = false
    },

    handleSubmitPoster () {
      this.dialog.poster = false
      this.form.Poster = this.dialog.formPoster.url
    },

    handleOpenBanner () {
      this.dialog.banner = true
    },

    handleCloseBanner () {
      this.dialog.banner = false
    },

    handleSubmitBanner () {
      this.dialog.banner = false
      this.form.Banner = this.dialog.formBanner.url
    },

    handleOpenPlayer () {
      this.dialog.formPlayer.url = this.form.PlayerURL
      this.dialog.player = true
    },

    handleClosePlayer () {
      this.dialog.player = false
    },

    handleSubmitPlayer () {
      this.dialog.player = false
      this.form.PlayerURL = this.dialog.formPlayer.url
    },

    async handleSearchMovie (query) {
      await this.searchMovie({ query: this.searchQuery })
    },

    async handleFetchMovieDetail (id) {
      const { data } = await this.fetchMovieDetail(id)
      this.form = {
        Title: data.Title,
        Actors: data.Actors,
        Award: data.Award,
        BoxOffice: data.BoxOffice,
        Country: data.Country,
        DVD: data.DVD,
        Director: data.Director,
        Genre: data.Genre,
        Language: data.Language,
        Plot: data.Plot,
        Poster: data.Poster,
        Production: data.Production,
        Rated: data.Rated,
        Released: data.Released,
        Response: data.Response,
        Runtime: data.Runtime,
        Type: data.Type,
        Website: data.Website,
        Writer: data.Writer,
        Year: data.Year,
        imdbID: data.imdbID,
        imdbRating: data.imdbRating,
        imdbVotes: data.imdbVotes,
        Banner: data.Banner,
        Trailer: data.Trailer,
        PlayerURL: `https://database.gdriveplayer.us/player.php?imdb=${data.imdbID}`
      }
    },

    topResult (array, n) {
      return array
        ? array.slice(0, n)
        : []
    },

    async handleSubmit () {
      await this.createShow(this.form)
      this.$toast.success('Berhasil menyimpan data')
      this.$router.push({
        name: 'in-show'
      })
    }
  }
}
</script>
