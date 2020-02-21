<template>
  <div style="height: 100vh">
    <div class="title-bar">
      <div>
        <nuxt-link to="/">
          <div class="cursor-pointer">
            <i class="fa fa-chevron-left" />
            {{ show.Title }}
          </div>
        </nuxt-link>
      </div>
    </div>
    <div
      v-if="!isFetchingShow"
      class="h-full w-full"
    >
      <iframe
        :src="show.PlayerURL"
        width="100%"
        title="player"
        height="100%"
        allowfullscreen="allowfullscreen"
      />
    </div>
    <div
      v-else
      class="loading"
    >
      <div>Loading ... </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Player',

  computed: {
    ...mapGetters({
      isFetchingShow: 'show/isFetchingShow',
      fetchingShowError: 'show/fetchingShowError',
      show: 'show/show'
    })
  },

  async mounted () {
    const { id } = this.$route.params
    await this.fetchShow(id)
  },

  methods: {
    ...mapActions({
      fetchShow: 'show/FETCH_SHOW'
    })
  }

}
</script>

<style lang="scss" scoped>
.title-bar {
  @apply absolute py-4 pr-4 pl-8 bg-black text-white w-full;
}

.loading {
  @apply h-full w-full text-center flex items-center text-center justify-center;
}
</style>
