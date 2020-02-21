<template>
  <div>
    <div class="highlight" style="background-image: url('https://image.tmdb.org/t/p/original/8K001T1pcEDQSOYwEI1wKps1qcA.jpg')">
      <div class="highlight-bg h-full">
        sdaasdadsasd
      </div>
    </div>
    <div style="transform: translateY(-15vw)">
      <Grid
        :title="'Terbaru'"
        :showList="shows"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import Slider from '~/components/Slider'
import Grid from '~/components/Grid'

export default {
  name: 'Homepage',
  layout: 'front',

  components: {
    // Slider,
    Grid
  },

  computed: {
    ...mapGetters({
      isFetchingSampleLink: 'sampleLink/isFetchingSampleLink',
      fetchingSampleLinkError: 'sampleLink/fetchingSampleLinkError',
      sampleLinks: 'sampleLink/sampleLinks',
      isFetchingShow: 'show/isFetchingShow',
      fetchingShowError: 'show/fetchingShowError',
      shows: 'show/shows'
    })
  },

  async mounted () {
    await this.fetchSampleLinks()
    await this.fetchShows()
  },

  methods: {
    ...mapActions({
      fetchSampleLinks: 'sampleLink/FETCH_SAMPLE_LINKS',
      fetchShows: 'show/FETCH_SHOWS'
    })
  }

}
</script>

<style lang="scss" scoped>
.top-menu {
  @apply flex justify-between py-4 bg-black px-12;
}
</style>
