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
      :link-type="dialog.linkType"
      @close="handleClosePlayer"
      @submit="handleSubmitPlayer"
    />
    <movie-search-input
      v-model="tmdbQuery"
      @select-movie="handleFetchMovieDetail"
    />
    <form
      @submit.prevent="handleSubmit"
      class="mt-5"
    >
      <b-row>
        <b-col cols="8">
          <b-card class="mb-2">
            <template v-slot:header>
              <h6 class="mb-0 d-inline">Posters</h6>
              <b-button
                size="sm"
                @click="handleOpenPoster"
              > + </b-button>
            </template>
            <b-img-lazy
              v-for="(image, idx) in form.posters"
              :key="idx"
              :src="image.path"
              width="80"
              thumbnail
            />
          </b-card>
          <b-card class="mb-2">
            <template v-slot:header>
              <h6 class="mb-0 d-inline">Banners</h6>
              <b-button
                size="sm"
                @click="handleOpenBanner"
              > + </b-button>
            </template>
            <b-img-lazy
              v-for="(image, idx) in form.banners"
              :key="idx"
              :src="image.path"
              width="160"
              thumbnail
            />
          </b-card>
          <b-form-group label="Title">
            <b-form-input v-model="form.title" />
          </b-form-group>
          <b-form-group label="Release Date">
            <b-form-input v-model="form.release_date" />
          </b-form-group>
          <b-form-group label="Genre">
            <b-form-tags
              v-model="form.genres"
              class="mb-2"
              placeholder="Masukkan genre"
            />
          </b-form-group>
          <b-form-group label="Production">
            <b-form-tags
              v-model="form.productions"
              class="mb-2"
              placeholder="Masukkan Production"
            />
          </b-form-group>
          <b-form-group label="Countries">
            <b-form-tags
              v-model="form.countries"
              class="mb-2"
              placeholder="Masukkan Negara"
            />
          </b-form-group>
          <b-form-group label="Overview">
            <b-form-textarea
              v-model="form.overview"
              rows="3"
              max-rows="6"
            />
          </b-form-group>
          <b-form-group label="Original Language">
            <b-form-input v-model="form.original_language" />
          </b-form-group>
          <b-form-group label="Runtime (m)">
            <b-form-input v-model="form.runtime" />
          </b-form-group>
          <b-form-group label="Rated">
            <b-form-input v-model="form.rated" />
          </b-form-group>
          <b-form-group label="Awards">
            <b-form-input v-model="form.awards" />
          </b-form-group>
          <b-form-group label="Videos">
            <b-list-group>
              <b-list-group-item
                v-for="(video, idx) in this.form.videos"
                :key="idx"
                class="d-flex justify-content-between align-items-center"
              >
                <div>
                  <span>[ {{ video.source }} ]</span>
                  <span> {{ video.player_url }} </span>
                </div>
                <div>
                  <b-button
                    size="sm"
                    class="mt-2"
                    variant="primary"
                    @click="handleOpenVideos(idx)"
                  >
                    <b-icon-pencil/>
                  </b-button>
                  <b-button
                    size="sm"
                    class="mt-2"
                    variant="danger"
                    @click="handleRemoveVideos(idx)"
                  >
                    <b-icon-trash/>
                  </b-button>
                </div>
              </b-list-group-item>
            </b-list-group>
            <b-button
              class="mt-2"
              @click="handleOpenVideos(null)"
            >
              Tambah
            </b-button>
          </b-form-group>
          <b-form-group label="PlayerURL">
            <b-list-group>
              <b-list-group-item
                v-if="form.player.player_url"
                class="d-flex justify-content-between align-items-center"
              >
                <div>
                  <span>[ {{ form.player.source }} ]</span>
                  <span> {{ form.player.player_url }} </span>
                </div>
                <div>
                  <b-button
                    size="sm"
                    class="mt-2"
                    variant="primary"
                    @click="handleOpenPlayer"
                  >
                    <b-icon-pencil/>
                  </b-button>
                  <b-button
                    size="sm"
                    class="mt-2"
                    variant="danger"
                    @click="handleRemovePlayer"
                  >
                    <b-icon-trash/>
                  </b-button>
                </div>
              </b-list-group-item>
            </b-list-group>
            <b-button
              v-if="!form.player.player_url"
              @click="handleOpenPlayer"
              class="mt-2"
            >
              Tambah
            </b-button>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Director">
            <b-form-input v-model="form.director" />
          </b-form-group>
          <b-list-group style="height: 400px; overflow: auto;">
            <b-list-group-item
              v-for="(actor, idx) in form.actors"
              :key="idx"
            >
              {{ actor.name }}
            </b-list-group-item>
          </b-list-group>
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

import { BFormGroup, BButton, BRow, BCol, BFormInput, BFormTextarea, BFormTags, BListGroup, BListGroupItem, BCard, BImgLazy, BIconTrash, BIconPencil } from 'bootstrap-vue'
import ImageChooser from '~/components/molecules/ImageChooser'
import LinkPreview from '~/components/molecules/LinkPreview'
import MovieSearchInput from '~/components/molecules/MovieSearchInput'

export default {
  name: 'AddShow',

  components: {
    BFormGroup,
    BButton,
    BRow,
    BCol,
    BFormInput,
    BFormTextarea,
    BFormTags,
    BListGroup,
    BListGroupItem,
    BCard,
    BImgLazy,
    BIconTrash,
    BIconPencil,
    ImageChooser,
    LinkPreview,
    MovieSearchInput
  },

  data () {
    return {
      tmdbQuery: '',
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
      },
      dialog: {
        poster: false,
        banner: false,
        player: false,
        linkType: 'player',
        formPoster: {
          url: ''
        },
        formBanner: {
          url: ''
        },
        formPlayer: {
          type: 'movie',
          source: '',
          player_url: ''
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

    handleOpenPoster () {
      this.dialog.poster = true
    },

    handleClosePoster () {
      this.dialog.poster = false
    },

    handleSubmitPoster () {
      this.dialog.poster = false
      this.form.posters.push({
        path: this.dialog.formPoster.url
      })
    },

    handleOpenBanner () {
      this.dialog.banner = true
    },

    handleCloseBanner () {
      this.dialog.banner = false
    },

    handleSubmitBanner () {
      this.dialog.banner = false
      this.form.banners.push({
        path: this.dialog.formBanner.url
      })
    },

    handleOpenPlayer () {
      this.dialog.linkType = 'player'
      this.dialog.formPlayer = this.form.player
      this.dialog.player = true
    },

    handleClosePlayer () {
      this.dialog.player = false
    },

    handleOpenVideos (id) {
      this.dialog.linkType = 'videos'
      if (id !== null) {
        this.dialog.formPlayer = {
          id,
          ...this.form.videos[id]
        }
      } else {
        this.dialog.formPlayer = {
          type: '',
          source: '',
          player_url: ''
        }
      }
      this.dialog.player = true
    },

    handleCloseVideos () {
      this.dialog.player = false
    },

    handleRemoveVideos (idx) {
      this.form.videos.splice(idx, 1)
    },

    handleSubmitPlayer (linkType) {
      if (linkType === 'player') {
        this.form.player = this.dialog.formPlayer
      } else {
        this.handleSubmitVideos()
      }
      this.dialog.player = false
    },

    handleSubmitVideos () {
      const id = this.dialog.formPlayer.id
      if (id) {
        this.form.videos[id] = this.dialog.formPlayer
      } else {
        this.form.videos.push(this.dialog.formPlayer)
      }
    },

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
        language: data.spoken_languages.map(item => ({ name: item.name })),
        countries: data.production_countries.map(item => item.name),
        productions: data.production_companies.map(item => item.name),
        title: data.title,
        vote_average: data.vote_average,
        imdb_rating: data.imdb_rating,
        awards: data.awards,
        actors: data.actors,
        crews: [],
        rated: data.rated,
        director: data.director,
        videos: data.videos.map((item) => {
          if (item.site === 'YouTube') {
            return {
              source: 'youtube',
              type: item.type,
              player_url: `https://www.youtube-nocookie.com/embed/${item.key}?rel=0`
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

    handleRemovePlayer () {
      this.form.player = {
        type: 'movie',
        source: '',
        player_url: ''
      }
    },

    topResult (array, n) {
      return array
        ? array.slice(0, n)
        : []
    },

    async handleSubmit () {
      const payload = {
        ...this.form,
        genres: this.form.genres.map(item => ({ name: item })),
        productions: this.form.productions.map(item => ({ name: item })),
        countries: this.form.countries.map(item => ({ name: item }))
      }
      await this.createMovie(payload)
      this.$toast.success('Berhasil menyimpan data')
      this.$router.push({
        name: 'in-movie'
      })
    }
  }
}
</script>
