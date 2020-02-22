<template>
  <div>
    <div class="flex justify-end mb-4">
      <b-button @click="handleCreateNew">
        Buat Baru
      </b-button>
    </div>
    <div v-if="!isFetchingShow">
      <b-table
        ref="selectableTable"
        :items="shows"
        :fields="fields"
        @row-selected="onRowSelected"
        selectable
        responsive="sm"
      >
        <template v-slot:cell(Poster)="data">
          <b-img :src="data.value" class="w-16" />
        </template>
      </b-table>
      <b-pagination
        v-model="filter.page"
        :total-rows="meta.total"
        :per-page="filter.limit"
        @change="handleChangePagination"
        first-number
        last-number
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Show',

  data () {
    return {
      filter: {
        page: 1,
        limit: 1
      },
      fields: ['Poster', 'Title', 'Runtime', 'Rated', 'Actors'],
      selected: []
    }
  },

  computed: {
    ...mapGetters({
      isFetchingShow: 'show/isFetchingShow',
      fetchingShowError: 'show/fetchingShowError',
      shows: 'show/shows',
      meta: 'show/meta'
    })
  },

  created () {
    this.$store.commit('common/SET_HEADER', 'Show')
  },

  async mounted () {
    await this.handleFetchShow()
  },

  methods: {
    ...mapActions({
      fetchShows: 'show/FETCH_SHOWS'
    }),

    onRowSelected (items) {
      this.selected = items
    },

    async handleFetchShow () {
      await this.fetchShows(this.filter)
    },

    async handleChangePagination (page) {
      this.filter.page = page
      await this.handleFetchShow()
    },

    handleCreateNew () {
      this.$router.push({ name: 'in-show-add' })
    }
  }
}
</script>
