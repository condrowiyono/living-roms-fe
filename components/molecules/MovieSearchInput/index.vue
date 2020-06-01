<template>
  <vue-bootstrap-typeahead
    v-model="data"
    :data="tmdbResults"
    :serializer="item => item.title"
    placeholder="Search Movie..."
    @hit="handleSelectMovie($event.id)"
  >
    <template
      slot="suggestion"
      slot-scope="{ data, htmlText }"
    >
      <div class="d-flex align-items-center">
        <b-img
          :src="`https://image.tmdb.org/t/p/w220_and_h330_face${data.poster_path}`"
          fluid
          width="50"
          blank-src="https://via.placeholder.com/50"
        />
        <span v-html="htmlText" class="ml-4" />
      </div>
    </template>
  </vue-bootstrap-typeahead>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { BImg } from 'bootstrap-vue'

export default {
  components: {
    VueBootstrapTypeahead,
    BImg
  },

  props: {
    value: {
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      data: this.value
    }
  },

  computed: {
    ...mapGetters({
      tmdbResults: 'tmdb/results'
    })
  },

  watch: {
    value (val) {
      this.data = this.value
    },
    data (val) {
      if (val.length > 3) {
        this.searchMovie({ query: val })
      }
    }
  },

  methods: {
    ...mapActions({
      searchMovie: 'tmdb/TMDB_SEARCH_MOVIE'
    }),

    handleSelectMovie (id) {
      this.$emit('select-movie', id)
    }
  }

}
</script>
