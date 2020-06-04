<template>
  <div>
    <div v-if="!isFetchingPerson">
      <b-table
        ref="selectableTable"
        :items="people"
        :fields="fields"
        @row-selected="onRowSelected"
        selectable
      >
        <template v-slot:cell(picture)>
          <b-avatar />
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
    <div />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { BTable, BPagination, BAvatar } from 'bootstrap-vue'

export default {
  name: 'Movie',

  components: {
    BTable,
    BPagination,
    BAvatar
  },

  data () {
    return {
      filter: {
        page: 1,
        limit: 20
      },
      fields: [
        'picture',
        'name',
        {
          key: 'more',
          label: 'More Picture'
        }
      ],
      selected: []
    }
  },

  computed: {
    ...mapGetters({
      isFetchingPerson: 'person/isFetchingPerson',
      fetchingPersonError: 'person/fetchingPersonError',
      people: 'person/people',
      meta: 'person/meta'
    })
  },

  created () {
    this.$store.commit('common/SET_HEADER', 'People')
  },

  async mounted () {
    await this.fetchPerson()
  },

  methods: {
    ...mapActions({
      fetchPerson: 'person/FETCH_PEOPLE'
    }),

    onRowSelected (items) {
      this.selected = items
    },

    async handleFetchPerson () {
      await this.fetchPerson(this.filter)
    },

    async handleChangePagination (page) {
      this.filter.page = page
      await this.handleFetchPerson()
    }
  }
}
</script>
