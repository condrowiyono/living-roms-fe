<template>
  <div class="h-full relative">
    <div class="highlight-top movie-detail-container">
      <transition name="fade-transition">
        <div
          :style="setBackgroundImage(show.Banner)"
          class="movie-detail-background"
        >
          <div class="movie-detail-bg-gradient">
            <div class="pt-24">
              <div class="movie-detail-title sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                {{ show.Title }}
              </div>
              <transition name="fade-transition">
                <div v-if="selectedDetailMenu === 'overview'">
                  <div class="movie-detail-caption">
                    <div>
                      <span class="mr-2"> {{ show.Year }} </span>
                      <span class="border px-1 mr-2">{{ show.Rated }}</span>
                      <span> {{ show.Runtime }} </span>
                    </div>
                    <div class="mt-4">
                      <nuxt-link
                        :to="{
                          name: 'player-id',
                          params: { id: show.ID }
                        }"
                      >
                        <b-button class="movie-detail-play-btn">Play</b-button>
                      </nuxt-link>
                    </div>
                    <div class="mt-4">
                      {{ show.Plot }}
                    </div>
                    <div class="mt-4">
                      <span class="font-bold"> Pemeran: </span>
                      <span> {{ show.Actors }} </span>
                    </div>
                    <div>
                      <span class="font-bold"> Genre: </span>
                      <span> {{ show.Genre }} </span>
                    </div>
                  </div>
                </div>
              </transition>
              <transition name="fade-transition">
                <div v-if="selectedDetailMenu === 'trailer'">
                  <div class="movie-detail-caption">
                    <div class="text-white text-4xl font-bold">
                      Trailer
                    </div>
                  </div>
                </div>
              </transition>
              <transition name="fade-transition">
                <div v-if="selectedDetailMenu === 'details'">
                  <div class="movie-detail-caption">
                    <div class="text-white text-4xl font-bold">
                      Details
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div class="movie-detail-menu">
              <div
                v-for="(menu, index) in detailMenus"
                :key="index"
                :class="{selected: menu === selectedDetailMenu}"
                @click="selectedDetailMenu = menu"
                class="movie-detail-menu-item"
              >
                {{ menu }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Player',
  layout: 'front',

  data () {
    return {
      selectedDetailMenu: 'overview',
      detailMenus: ['overview', 'trailer', 'details']
    }
  },

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
    }),

    setBackgroundImage (url) {
      return {
        backgroundImage: `url('${url}')`
      }
    }
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

/deep/ .movie-detail-container {
  height: 40vw;
}
</style>
