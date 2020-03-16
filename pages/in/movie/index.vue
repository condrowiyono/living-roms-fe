<template>
  <div>
    <div class="flex justify-end mb-4">
      <b-button @click="handleCreateNew">
        Buat Baru
      </b-button>
    </div>
    <div v-if="!isFetchingMovie">
      <b-table
        ref="selectableTable"
        :items="movies"
        :fields="fields"
        @row-selected="onRowSelected"
        selectable
        responsive="sm"
      >
        <template v-slot:cell(posters)="data">
          <b-img
            v-for="poster in data.item.posters"
            :key="poster.ID"
            :src="poster.path"
            width="100"
            fluid
          />
        </template>
        <template v-slot:cell(actions)>
          <b-dropdown right text="Aksi" class="m-md-2">
            <b-dropdown-item> <b-icon-pencil /> Edit </b-dropdown-item>
            <b-dropdown-item> <b-icon-trash /> Hapus</b-dropdown-item>
          </b-dropdown>
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
import { BTable, BPagination, BButton, BImg, BIconTrash, BIconPencil, BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'Movie',

  components: {
    BTable,
    BPagination,
    BButton,
    BImg,
    BIconTrash,
    BIconPencil,
    BDropdown,
    BDropdownItem
  },

  data () {
    return {
      filter: {
        page: 1,
        limit: 20
      },
      fields: ['posters', 'title', 'runtime', 'rated', 'overview', 'actions'],
      selected: []
    }
  },

  computed: {
    ...mapGetters({
      isFetchingMovie: 'movie/isFetchingMovie',
      fetchingMovieError: 'movie/fetchingMovieError',
      movies: 'movie/movies',
      meta: 'movie/meta'
    })
  },

  created () {
    this.$store.commit('common/SET_HEADER', 'Movie')
  },

  async mounted () {
    await this.handleFetchMovie()
  },

  methods: {
    ...mapActions({
      fetchMovies: 'movie/FETCH_MOVIES'
    }),

    onRowSelected (items) {
      this.selected = items
    },

    async handleFetchMovie () {
      await this.fetchMovies(this.filter)
    },

    async handleChangePagination (page) {
      this.filter.page = page
      await this.handleFetchMovie()
    },

    handleCreateNew () {
      this.$router.push({ name: 'in-movie-add' })
    }
  }
}
</script>
