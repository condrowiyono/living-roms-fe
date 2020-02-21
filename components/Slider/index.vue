<template>
  <div class="slider-content-container">
    <div class="slider-title-container">
      <div class="title">
        <div
          @mouseover="showSeeAll = true"
          @mouseout="showSeeAll = false"
        >
          <span>Movies</span>
          <span
            :class="{ visible: showSeeAll }"
            @mousein.stop="showSeeAll = true"
            class="hidden-element"
          >
            See All
            <i class="fa fa-angle-right" />
          </span>
        </div>
      </div>
      <div
        v-if="isShowPagination"
        class="pagination"
      >
        <span
          v-for="(x, index) in Math.ceil(showList.length / contentContainerSize)"
          :key="index"
          :class="{'bg-white': (slideContainer[1] === index), 'bg-gray-700': (slideContainer[1] !== index) }"
        />
      </div>
    </div>
    <div
      @mouseover="isShowPagination = true"
      @mouseout="isShowPagination = false"
      @click="right"
      v-if="Math.ceil(showList.length / contentContainerSize) !== 1"
      class="slide-button slide-button--right"
    >
      <i
        class="fa fa-chevron-right fa-2x"
        aria-hidden="true"
      />
    </div>
    <div
      @mouseover="isShowPagination = true"
      @mouseout="isShowPagination = false"
      @click="left"
      v-if="infinityLoop"
      class="slide-button slide-button--left"
    >
      <i
        class="fa fa-chevron-left fa-2x"
        aria-hidden="true"
      />
    </div>
    <div
      ref="showcase"
      :class="{expand: expandShowcase}"
      v-on:mouseleave="hideShowcase"
      @mouseover="isShowPagination = true"
      @mouseout="isShowPagination = false"
      class="showcase"
    >
      <div
        v-if="selectedSlide"
        @click="handleClickShowcase"
        class="showcase-body"
      >
        <div class="showcase-body-theatrical">
          <img
            :src="selectedSlide.Banner"
            alt="Banner"
          >
        </div>
        <div class="showcase-body-caption-container">
          <div class="showcase-body-caption__movie-info">
            <div class="movie-info__title">
              {{ selectedSlide.Title }}
            </div>
            <div class="movie-info__info">
              <span class="year"> {{ selectedSlide.Year }}</span>
              <span class="rating">{{ selectedSlide.Rated }}</span>
              <span class="runtime">{{ selectedSlide.Runtime }}</span>
            </div>
            <div class="movie-info__genre">
              {{ selectedSlide.Genre }}
            </div>
          </div>
          <div class="text-center">
            <div
              @click.stop="handleClickShowcaseAction(selectedSlide)"
              class="showcase-action"
            >
              <i
                class="fa fa-angle-down"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="wrapper"
      ref="wrapper"
      @mouseover="isShowPagination = true"
      @mouseout="isShowPagination = false"
      class="slider-wrapper"
    >
      <TransitionGroup
        tag="div"
        class="slider"
        name="list"
      >
        <div
          v-for="(container,slideContainerIndex) in slideContainer"
          :key="container"
          :class="[slideContainerIndex%3 === 1 ? 'middle' : '']"
          v-on:transitionend="containerTransition"
          class="slide-container"
        >
          <div
            ref="slides"
            v-for="(content , index) in contentContainer[container]"
            v-mouse:mouseover="{position: slideContainerIndex % 3, handler: selectSlide}"
            v-mouse:mouseout="{position: slideContainerIndex % 3, handler: unselectSlide}"
            :key="content.id"
            :id="'slide-'+container+'-'+index"
            :class="{selected: markSlideSelected(content)}"
            :style="setBackgroundImage(content.Poster)"
            :data-container-index="slideContainerIndex"
            :data-content-index="index"
            @click.stop="handleClickSlide(content)"
            @mouseover="setSelectedSlide(content)"
            class="slide"
          />
        </div>
      </TransitionGroup>
      <Transition name="fade">
        <div
          v-if="showMovieDetail"
          class="movie-detail-container"
        >
          <transition name="fade-transition">
            <div
              :style="setBackgroundImage(selectedSlide.Banner)"
              class="movie-detail-background"
            >
              <div class="movie-detail-bg-gradient">
                <div>
                  <div class="movie-detail-close-btn">
                    <div @click="handleCloseDetail">
                      <BIconX />
                    </div>
                  </div>
                  <div>
                    <div class="movie-detail-title sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                      {{ selectedSlide.Title }}
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
      </Transition>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Slider',

  directives: {
    mouse: {
      bind (el, binding) {
        if (binding.value.position === 1) {
          el.addEventListener(binding.arg, binding.value.handler)
        }
      },

      update (el, binding) {
        if (binding.value.position === 1) {
          el.addEventListener(binding.arg, binding.value.handler)
        } else {
          el.removeEventListener(binding.arg, binding.value.handler)
        }
      }
    }
  },

  props: {
    showList: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: 'Show'
    }
  },

  data () {
    return {
      bodyMarginLeft: document.body.getBoundingClientRect().left,
      expandShowcase: false,
      timeoutID: '',
      ratio: 1.125,
      distanceMultipler: 15,
      widthScaleRatio: 2.5,
      selectedSlidePos: {},
      isSliding: false,
      isShowPagination: false,
      slideContainer: [-1, 0, 1],
      contentContainer: [],
      contentContainerSize: 6,
      infinityLoop: false,
      showMovieDetail: false,
      selectedSlide: null,
      selectedDetailMenu: 'overview',
      detailMenus: ['overview', 'trailer', 'details'],
      showSeeAll: false
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
  mounted () {
    this.$el.style.setProperty('--ratio', `${this.ratio}`)
    window.addEventListener('resize', _.debounce(this.resetContentContainer, 150))
  },

  destroyed () {
    window.removeEventListener('resize', _.debounce(this.resetContentContainer, 150))
  },

  created () {
    this.setContentContainer()
  },

  methods: {
    left: _.debounce(function slideLeft () {
      if (!this.expandShowcase) {
        this.isSliding = true
        // Infinity loop
        if (this.slideContainer[0] === 0) {
          const page = this.contentContainer.length - 1
          this.slideContainer.unshift(page)
        } else {
          this.slideContainer.unshift(this.slideContainer[0] - 1)
        }
        this.slideContainer.pop()
      }
    }, 500),

    right: _.debounce(function slideRight () {
      if (!this.expandShowcase && _.last(this.slideContainer) < this.contentContainer.length) {
        this.isSliding = true
        this.infinityLoop = true
        // Infinity loop
        if (_.last(this.slideContainer) === this.contentContainer.length - 1) {
          const page = (this.contentContainer.length - _.last(this.slideContainer)) - 1
          this.slideContainer.push(page)
        } else {
          this.slideContainer.push(_.last(this.slideContainer) + 1)
        }
        this.slideContainer.shift()
      }
    }, 500),

    selectSlide (event) {
      if (this.showMovieDetail) { return }
      this.timeoutID = setTimeout(() => {
        if (!this.isSliding && !this.expandShowcase) {
          const distanceMultipler = this.distanceMultipler
          const selectedSlide = event.target
          this.selectedSlidePos = this.slideIsFirstOrLast(selectedSlide)
          const transitionDistance = this.transitionDistance(selectedSlide)
          const selectedContainer = this.containerIndex(selectedSlide)
          this.popShowcase(selectedSlide)
          const animationCallback = (currentSlide) => {
            if (currentSlide !== selectedSlide) {
              const currentContainer = this.containerIndex(currentSlide)
              let direction = 0
              if (this.selectedSlidePos.isFirst) {
                if (currentContainer >= 1) {
                  direction = 1
                }
              } else if (this.selectedSlidePos.isLast) {
                if (currentContainer <= 1) {
                  direction = -1
                }
              } else if (currentContainer === selectedContainer) {
                direction =
                this.contentIndex(currentSlide) < this.contentIndex(selectedSlide) ? 1 : -1
              } else {
                direction = currentContainer < 1 ? 1 : -1
              }
              this.setStyleProperty(currentSlide, { transform: `translateX(${transitionDistance * distanceMultipler * direction}px)` })
            }
          }
          this.animateSlideTransition(animationCallback)
        }
      }, 500)
    },

    unselectSlide () {
      clearTimeout(this.timeoutID)
    },

    containerIndex (element) {
      return element.dataset.containerIndex * 1
    },

    contentIndex (element) {
      return element.dataset.contentIndex * 1
    },

    slideIsFirstOrLast (element) {
      return {
        isFirst: this.slideIsFirst(element),
        isLast: this.slideIsLast(element)
      }
    },

    slideIsFirst (element) {
      return this.contentIndex(element) === 0
    },

    slideIsLast (element) {
      return this.contentIndex(element) === this.contentContainerSize - 1
    },

    transitionDistance (element) {
      if (this.selectedSlidePos.isFirst || this.selectedSlidePos.isLast) {
        return element.clientWidth * (this.ratio - 1)
      }
      return element.clientWidth * ((this.ratio - 1) / -2)
    },

    animateSlideTransition (callback) {
      this.$refs.slides.forEach((slide) => {
        callback(slide)
      })
    },

    containerTransition () {
      // Triggered by 'transitionend' event from slider container
      this.isSliding = false
    },

    popShowcase (selectedSlide) {
      const selectedRect = selectedSlide.getBoundingClientRect()
      const showcaseWidth = selectedRect.left - this.bodyMarginLeft
      const showcaseStyle = {
        left: `${showcaseWidth}px`,
        width: `${selectedRect.width}px`,
        height: `${selectedRect.height}px`,
        backgroundColor: `${selectedSlide.style.backgroundColor}`
      }
      let transformOrigin = 'center center'
      if (this.selectedSlidePos.isFirst) {
        transformOrigin = 'center left'
      } else if (this.selectedSlidePos.isLast) {
        transformOrigin = 'center right'
      }
      Object.assign(showcaseStyle, { 'transform-origin': transformOrigin })
      this.setStyleProperty(this.$refs.showcase, showcaseStyle)
      this.expandShowcase = true
    },

    hideShowcase (event) {
      if (event.currentTarget.classList.contains('expand')) {
        this.expandShowcase = false
        this.animateSlideTransition((currentSlide) => {
          this.setStyleProperty(currentSlide, { transform: '' })
        })
      }
    },

    resetContentContainer () {
      this.setContentContainer()
      this.updateContentContainer()
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
    },

    updateContentContainer () {
      this.slideContainer = [-1, 0, 1]
    },

    setStyleProperty (element, styles) {
      Object.assign(element.style, styles)
    },

    handleClickShowcase () {
      console.warn('play')
    },

    handleClickShowcaseAction (content) {
      this.selectedSlide = content
      this.showMovieDetail = true
    },

    markSlideSelected (content) {
      return this.selectedSlide === content && this.showMovieDetail
    },

    setSelectedSlide (content) {
      clearTimeout(this.timeoutID)

      if (this.showMovieDetail) { return }

      this.timeoutID = setTimeout(() => {
        this.selectedSlide = content
      }, 200)
    },

    handleCloseDetail () {
      this.selectedSlide = null
      this.showMovieDetail = false
    },

    handleClickSlide (content) {
      this.selectedSlide = content
      if (!this.showMovieDetail) {
        this.showMovieDetail = true
      }
    },

    setBackgroundImage (url) {
      return {
        backgroundImage: `url('${url}')`
      }
    }
  }
}
</script>
