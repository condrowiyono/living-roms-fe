<template>
  <b-modal
    v-model="showModal"
    :title="title"
    @hide="handleClose"
    @ok="handleSubmit"
    size="lg"
  >
    <b-form-group
      label-cols="3"
      label="Pilih Sumber"
    >
      <b-form-select
        v-model="selected"
        :options="options"
        @change="handleSourceChange"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="selected === 'url'"
      label="URL"
    >
      <b-form-input
        v-on:keyup.enter="handleURLEnter"
        v-model="url"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="selected === 'google'"
      label="Query"
    >
      <b-form-input
        v-model="imageQuery"
        v-on:keyup.enter="handleImageSearch"
        debounce="500"
        class="mb-2"
      />
      <card-image-container
        id="image-result-google"
        :loading="isImageSearching"
        :data="filteredResult"
        :toolbar-options="topImageOptions"
        :default-selected-toolbar="topImageSelected"
        @toolbar-change="handleTopResultGoogle"
        @select-card="handleSelectImage"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="selected === 'duckduckgo'"
      label="Query"
    >
      <b-form-input
        v-model="imageQuery"
        v-on:keyup.enter="handleImageSearch"
        debounce="500"
        class="mb-2"
      />
      <card-image-container
        id="image-result-duckduckgo"
        :loading="isImageSearching"
        :data="filteredResult"
        :toolbar-options="topImageOptions"
        :default-selected-toolbar="topImageSelected"
        @toolbar-change="handleTopResultDuckDuckGo"
        @select-card="handleSelectImage"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="selected === 'upload'"
    >
      <b-form-file
        v-model="file"
        placeholder="Pilih atau seret gambar disini"
        drop-placeholder="Jatuhkan disini"
        class="mb-2"
      />
      <b-button
        @click="handleUpload"
        class="w-100"
      >
        Upload
      </b-button>
    </b-form-group>
    <b-form-group
      label-cols="3"
      label="TMDB ID"
      v-if="selected === 'tmdb_banner'"
    >
      <movie-search-input
        v-model="tmdbQuery"
        @select-movie="handleImageSearch"
      />
      <card-image-container
        id="image-result-tmdb"
        :loading="isFetchingDetail"
        :data="filteredResult"
        :toolbar-options="topImageOptions"
        :default-selected-toolbar="topImageSelected"
        @toolbar-change="handleTopResultTMDB"
        @select-card="handleSelectImage"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      label="TMDB ID"
      v-if="selected === 'tmdb_poster'"
    >
      <movie-search-input
        v-model="tmdbQuery"
        @select-movie="handleImageSearch"
      />
      <card-image-container
        id="image-result-tmdb"
        :loading="isFetchingDetail"
        :data="filteredResult"
        :toolbar-options="topImageOptions"
        :default-selected-toolbar="topImageSelected"
        @toolbar-change="handleTopResultTMDB"
        @select-card="handleSelectImage"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="form.url"
      label="Preview"
    >
      <div class="img-preview rounded bg-light border d-flex justify-content-center">
        <b-img-lazy
          :src="form.url"
          :width="300"
          fluid
          class="p-2"
        />
      </div>
      <b-form-input
        v-model="form.url"
        disabled
        class="mt-2 small"
      />
    </b-form-group>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { BModal, BFormGroup, BFormInput, BFormSelect, BImgLazy, BFormFile, BButton } from 'bootstrap-vue'
import CardImageContainer from '~/components/atoms/CardImageContainer'
import MovieSearchInput from '~/components/molecules/MovieSearchInput'

export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BImgLazy,
    BFormFile,
    BButton,
    CardImageContainer,
    MovieSearchInput
  },

  props: {
    title: {
      type: String,
      default: 'Modal'
    },
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      topImageSelected: 10,
      topImageOptions: [
        { text: 'Top 10', value: 10 },
        { text: 'Semua', value: null }
      ],
      url: '',
      filteredResult: [],
      imageQuery: '',
      tmdbQuery: '',
      tmdb: 0,
      file: null,
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'google', text: 'Google' },
        { value: 'duckduckgo', text: 'DuckDuckGo Image' },
        { value: 'url', text: 'URL' },
        { value: 'tmdb_banner', text: 'TMDB Banner' },
        { value: 'tmdb_poster', text: 'TMDB Poster' },
        { value: 'upload', text: 'Upload dari Komputer' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      isImageSearching: 'image/isSearching',
      imageResultDuckDuckGo: 'image/duckduckgo',
      imageResultGoogle: 'image/google',
      imageResultTMDB: 'tmdb/movieImage',
      isFetchingDetail: 'tmdb/isFetchingDetail',
      tmdbResults: 'tmdb/results'
    }),

    form: {
      get () {
        return this.value
      },
      set (form) {
        this.$emit('input', form)
      }
    },

    showModal: {
      get () {
        return this.show
      },
      set (showModal) {
        this.$emit('input', showModal)
      }
    }
  },

  watch: {
    showModal (val) {
      if (val) {
        this.handleReset()
        this.form.url = ''
        this.imageQuery = ''
        this.selected = null
      }
    },
    tmdbQuery (val) {
      if (val.length > 3) {
        this.searchMovie({ query: val })
      }
    }
  },

  methods: {
    ...mapActions({
      imageDuckDuckGo: 'image/IMAGE_SEARCH_DUCKDUCKGO',
      resetImageDuckDuckGo: 'image/RESET_IMAGE_RESULT_DUCKDUCKGO',
      imageGoogle: 'image/IMAGE_SEARCH_GOOGLE',
      resetImageGoogle: 'image/RESET_IMAGE_RESULT_GOOGLE',
      uploadImage: 'image/IMAGE_UPLOAD',
      searchMovie: 'tmdb/TMDB_SEARCH_MOVIE',
      imageMovie: 'tmdb/TMDB_MOVIE_IMAGE'
    }),

    handleSubmit () {
      this.$emit('submit')
    },

    handleReset () {
      this.resetImageDuckDuckGo()
      this.resetImageGoogle()
      this.filteredResult = []
      this.form.url = ''
    },

    handleClose () {
      this.$emit('close')
    },

    async handleImageSearch (val) {
      if (this.selected === 'duckduckgo') {
        await this.imageDuckDuckGo({ query: this.imageQuery })
        this.handleTopResultDuckDuckGo(this.topImageSelected)
      } else if (this.selected === 'google') {
        await this.imageGoogle({ query: this.imageQuery })
        this.handleTopResultGoogle(this.topImageSelected)
      } else if (this.selected === 'tmdb_banner') {
        await this.imageMovie({ tmdb: val, type: 'banners' })
        this.handleTopResultTMDB(this.topImageSelected)
      } else if (this.selected === 'tmdb_poster') {
        await this.imageMovie({ tmdb: val, type: 'posters' })
        this.handleTopResultTMDB(this.topImageSelected)
      }
    },

    handleURLEnter () {
      this.form.url = this.url
    },

    topResult (array, n) {
      return array
        ? array.slice(0, n)
        : []
    },

    handleSelectImage (url) {
      this.form.url = url
    },

    async handleUpload () {
      const { data } = await this.uploadImage(this.file)
      this.form.url = data.path
    },

    handleTopResultDuckDuckGo (val) {
      if (val !== null) {
        this.filteredResult = this.topResult(this.imageResultDuckDuckGo, val)
      } else {
        this.filteredResult = this.imageResultDuckDuckGo
      }
    },

    handleTopResultGoogle (val) {
      if (val !== null) {
        this.filteredResult = this.topResult(this.imageResultGoogle, val)
      } else {
        this.filteredResult = this.imageResultGoogle
      }
    },

    handleTopResultTMDB (val) {
      if (val !== null) {
        this.filteredResult = this.topResult(this.imageResultTMDB, val)
      } else {
        this.filteredResult = this.imageResultTMDB
      }
    },

    handleSourceChange () {
      this.handleReset()
    }
  }
}
</script>
