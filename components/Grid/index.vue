<template>
  <div class="grid-content-container">
    <div class="grid-title-container">
      <div class="title">
        <div>
          <span>{{ title }}</span>
        </div>
      </div>
    </div>
    <div v-if="loading" class="grid-content">
      <div v-for="n in 5" :key="n" class="grid-slide" style="background-image:url('https://via.placeholder.com/150')">
        <div class="skeleton">
        </div>
      </div>
    </div>
    <div
      v-else
      v-for="(container, idx) in contentContainer"
      :key="idx"
      class="grid-content"
    >
      <div
        v-for="(content, index) in contentContainer[idx]"
        :ref="`grid-${idx}`"
        :key="index"
        :class="{selected: markSlideSelected(content, idx)}"
        :style="setBackgroundImage(content.Poster)"
        :data-index="index"
        :data-container-index="idx"
        @click="onClickSlide(content, idx)"
        class="grid-slide sm:w-1/4 md:w-1/6 lg:w-1/8"
      />
      <transition name="fade">
        <div
          v-if="selectedSlideContainer[idx]"
          class="movie-detail-container__grid"
        >
          <transition name="fade-transition">
            <div
              :style="setBackgroundImage(selectedSlide.Banner)"
              class="movie-detail-background"
            >
              <div class="movie-detail-bg-gradient">
                <div>
                  <div class="movie-detail-close-btn">
                    <div @click="closeSelectedSlide">
                      <BIconX />
                    </div>
                  </div>
                  <div>
                    <div class="movie-detail-title sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                      <nuxt-link
                          :to="{
                            name: 'show-id',
                            params: { id: selectedSlide.ID }
                          }"
                        >
                        {{ selectedSlide.Title }}
                      </nuxt-link>
                    </div>
                  </div>
                  <transition name="fade-transition">
                    <div v-if="selectedDetailMenu === 'overview'">
                      <div class="movie-detail-caption">
                        <div>
                          <span class="mr-2"> {{ selectedSlide.Year }} </span>
                          <span class="border px-1 mr-2">{{ selectedSlide.Rated }}</span>
                          <span> {{ selectedSlide.Runtime }} </span>
                        </div>
                        <div class="mt-4">
                          <nuxt-link
                            :to="{
                              name: 'player-id',
                              params: { id: selectedSlide.ID }
                            }"
                          >
                            <b-button class="movie-detail-play-btn">Play</b-button>
                          </nuxt-link>
                        </div>
                        <div class="mt-4">
                          {{ selectedSlide.Plot }}
                        </div>
                        <div class="mt-4">
                          <span class="font-bold"> Pemeran: </span>
                          <span> {{ selectedSlide.Actors }} </span>
                        </div>
                        <div>
                          <span class="font-bold"> Genre: </span>
                          <span> {{ selectedSlide.Genre }} </span>
                        </div>
                      </div>
                    </div>
                  </transition>
                  <transition name="fade-transition">
                    <div
                      v-if="selectedDetailMenu === 'trailer'"
                      class="tab-2"
                    >
                      <div class="movie-detail-caption cursor-default">
                        <div class="text-white text-4xl font-bold">
                          Trailer
                        </div>
                      </div>
                    </div>
                  </transition>
                  <transition name="fade-transition">
                    <div
                      v-if="selectedDetailMenu === 'details'"
                      class="tab-3"
                    >
                      <div class="movie-detail-caption cursor-default">
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
      </transition>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'Grid',

  props: {
    showList: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: 'Show'
    },
    loading: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      contentContainerSize: 8,
      contentContainer: [],
      selectedDetailMenu: 'overview',
      detailMenus: ['overview', 'trailer', 'details'],
      selectedSlide: null,
      selectedSlideContainer: []
    }
  },

  watch: {
    showList: {
      deep: true,
      handler () {
        this.setContentContainer()
      }
    }
  },

  created () {
    this.setContentContainer()
  },

  mounted () {
    window.addEventListener('resize', _.debounce(this.setContentContainer, 150))
  },

  destroyed () {
    window.removeEventListener('resize', _.debounce(this.setContentContainer, 150))
  },

  methods: {
    onClickSlide (content, idx) {
      this.selectedSlide = content
      this.resetSelectedSlideContainer()
      this.selectedSlideContainer[idx] = true
    },

    closeSelectedSlide () {
      this.resetSelectedSlideContainer()
      this.selectedSlide = null
    },

    markSlideSelected (content, index) {
      return this.selectedSlide === content && this.selectedSlideContainer[index]
    },

    setBackgroundImage (url) {
      return {
        backgroundImage: `url('${url}')`
      }
    },

    setContentContainer () {
      if (window.matchMedia('(max-width: 480px)').matches) {
        this.contentContainerSize = 3
      } else if (window.matchMedia('(max-width: 768px)').matches) {
        this.contentContainerSize = 4
      } else if (window.matchMedia('(max-width:1024px)').matches) {
        this.contentContainerSize = 6
      } else {
        this.contentContainerSize = 8
      }
      this.contentContainer = _.chunk(this.showList, this.contentContainerSize)
      this.resetSelectedSlideContainer()
    },

    resetSelectedSlideContainer () {
      this.selectedSlideContainer = []
      this.contentContainer.forEach(() => {
        this.selectedSlideContainer.push(false)
      })
    }
  }
}
</script>
