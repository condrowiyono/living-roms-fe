<template>
  <b-modal
    v-model="showModal"
    :title="title"
    @hide="handleClose"
    @ok="handleSubmit"
    size="lg"
  >
    <b-form-group label="Pilih Sumber">
      <b-form-select v-model="selected" :options="options" />
    </b-form-group>
    <b-form-group
      v-if="selected === 'url'"
      label="URL"
    >
      <b-form-input v-model="form.url" debounce="500" />
    </b-form-group>
    <b-form-group
      v-if="selected === 'duckduckgo'"
      label="Query"
    >
      <b-form-input
        v-model="imageQuery"
        v-on:keyup.enter="handleImageSearch"
        debounce="500"
      />
      <div
        v-if="isImageSearching"
        class="w-full flex justify-center"
      >
        <div class="text-center">
          <b-spinner variant="primary" />
        </div>
      </div>
      <b-row v-else cols="5">
        <b-col
          v-for="image in topResult(imageResultDuckDuckGo, 100)"
          :key="image.thumbnail"
          @click="handleSelectDuckDuckGo(image.image)"
          class="border flex justify-center items-center h-48 w-48 cursor-pointer"
        >
          <b-img-lazy :src="image.thumbnail" />
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group
      :description="`URL: ${form.url}`"
      label="Preview"
    >
      <b-img-lazy :src="form.url" />
    </b-form-group>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
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
      imageQuery: '',
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'google', text: 'Google' },
        { value: 'duckduckgo', text: 'DuckDuckGo Image' },
        { value: 'url', text: 'URL' },
        { value: 'tmdb', text: 'TMDB' },
        { value: 'local', text: 'Upload dari Komputer' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      isImageSearching: 'image/isSearching',
      imageResultDuckDuckGo: 'image/duckduckgo'
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
    }
  },

  methods: {
    ...mapActions({
      imageDuckDuckGo: 'image/IMAGE_SEARCH_DUCKDUCKGO',
      resetImageDuckDuckGo: 'image/RESET_IMAGE_RESULT_DUCKDUCKGO'
    }),

    handleSubmit () {
      this.$emit('submit')
    },

    handleReset () {
      this.resetImageDuckDuckGo()
    },

    handleClose () {
      this.$emit('close')
    },

    async handleImageSearch () {
      if (this.selected === 'duckduckgo') {
        await this.imageDuckDuckGo({ query: this.imageQuery })
      }
    },

    topResult (array, n) {
      return array
        ? array.slice(0, n)
        : []
    },

    handleSelectDuckDuckGo (url) {
      this.form.url = url
    }
  }
}
</script>

<style>

</style>
