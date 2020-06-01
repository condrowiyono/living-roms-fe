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
            v-if="data.item.banners.length"
            :src="data.item.banners[0].path"
            width="150"
            fluid
          />
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
            dan lainnya ...
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
            dan lainnya ...
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
            dan lainnya ...
          </div>
        </template>
        <template v-slot:cell(player)="data">
          <a
            :href="data.item.player.player_url"
            target="_blank"
          >
            <span>
              <b-icon-arrow-up-right />
            </span>
          </a>
        </template>
        <template v-slot:cell(actions)="data">
          <b-dropdown right text="Aksi">
            <b-dropdown-item> <b-icon-pencil /> Edit </b-dropdown-item>
            <b-dropdown-item @click="handleDelete(data.item.ID)"> <b-icon-trash /> Hapus</b-dropdown-item>
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
import {
  BTable,
  BPagination,
  BButton,
  BImg,
  BIconTrash,
  BIconPencil,
  BDropdown,
  BDropdownItem,
  BIconArrowUpRight

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
    BIconArrowUpRight
  },

  data () {
    return {
      filter: {
        page: 1,
        limit: 20
      },
      fields: ['posters', 'title', 'countries', 'runtime', 'rated', 'release_date', 'genres', 'director', 'actors', 'player', 'actions'],
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
