<template>
  <div>
    <div class="d-flex justify-content-end mb-4">
      <b-button @click="handleCreateNew">
        Buat Baru
      </b-button>
    </div>
    <b-overlay
      :show="isFetchingMovie"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
    >
      <div>
        <b-table
          ref="selectableTable"
          :items="movies"
          :fields="fields"
          @row-selected="onRowSelected"
          selectable
          responsive="lg"
        >
          <template v-slot:head(title)>
            <div> Tittle </div>
            <div class="mt-2">
              <b-form-input
                v-on:keyup.enter="handleFetchMovie"
                v-model="filter.title"
                size="sm"
              />
            </div>
          </template>
          <template v-slot:cell(title)="data">
            <b-img
              v-if="data.item.banners.length"
              :src="data.item.banners[0].path"
              :width="120"
            />
            <div class="font-weight-bold">
              {{ data.item.title }}
            </div>
          </template>
          <template v-slot:cell(countries)="data">
            <div
              v-for="country in data.item.countries.slice(0, 3)"
              :key="country.ID"
            >
              {{ country.name }}
            </div>
            <div
              v-if="data.item.countries.length > 3"
              class="text-secondary"
            >
              dan lainnya
            </div>
          </template>
          <template v-slot:cell(genres)="data">
            <div
              v-for="genre in data.item.genres.slice(0, 3)"
              :key="genre.ID"
            >
              {{ genre.name }}
            </div>
            <div
              v-if="data.item.genres.length > 3"
              class="text-secondary"
            >
              dan lainnya
            </div>
          </template>
          <template v-slot:cell(actors)="data">
            <div
              v-for="actor in data.item.actors.slice(0, 3)"
              :key="actor.ID"
            >
              {{ actor.name }}
            </div>
            <div
              v-if="data.item.actors.length > 3"
              class="text-secondary"
            >
              dan lainnya
            </div>
          </template>
          <template v-slot:cell(actions)="data">
            <b-dropdown right text="Aksi">
              <b-dropdown-item :to="{ name: 'in-movie-edit-id', params: { id: data.item.ID }}">
                <b-icon-pencil /> Edit
              </b-dropdown-item>
              <b-dropdown-item @click="handleDelete(data.item.ID)">
                <b-icon-trash /> Hapus
              </b-dropdown-item>
              <b-dropdown-item
                :href="data.item.player.player_url"
                target="_blank"
              >
                <b-icon-arrow-up-right /> Lihat Player
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
        <b-pagination
          v-model="filter.page"
          :total-rows="meta.total"
          :per-page="filter.limit"
          @change="handleChangePagination"
          class="float-right"
          first-number
          last-number
        />
      </div>
    </b-overlay>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {
  BTable,
  BPagination,
  BButton,
  BImg,
  BIconTrash,
  BIconPencil,
  BDropdown,
  BDropdownItem,
  BIconArrowUpRight,
  BOverlay,
  BFormInput
} from 'bootstrap-vue'

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
    BDropdownItem,
    BIconArrowUpRight,
    BOverlay,
    BFormInput
  },

  data () {
    return {
      filter: {
        page: 1,
        limit: 20,
        title: ''
      },
      fields: ['title', 'countries', 'runtime', 'rated', 'release_date', 'genres', 'director', 'actors', 'actions'],
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
      fetchMovies: 'movie/FETCH_MOVIES',
      deleteMovie: 'movie/DELETE_MOVIE'
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
    },

    async handleDelete (id) {
      try {
        const confirmed = await this.$bvModal.msgBoxConfirm('Apakah Anda yakin?')
        if (!confirmed) { return }

        await this.deleteMovie(id)
        await this.handleFetchMovie()
      } catch (error) {}
    }
  }
}
</script>
