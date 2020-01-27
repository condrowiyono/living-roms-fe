import _ from 'lodash'
import movieList from './movie'

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
      // contentData: [1, 2, 3, 4, 5],
      contentData: movieList,
      infinityLoop: false,
      showMovieDetail: false,
      selectedSlide: null,
      selectedDetailMenu: 'overview',
      detailMenus: ['overview', 'trailer', 'details'],
      showSeeAll: false
    }
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
      const containerIndex = this.containerIndex(element)
      console.warn(this.contentIndex(element), this.contentContainer[containerIndex].length)

      // if (this.contentContainer.length === 1) { return false }
      // if (this.contentContainer.length === 1 && this.contentContainerSize === this.contentIndex(element) + 1) { return true }
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
      this.contentContainer = _.chunk(this.contentData, this.contentContainerSize)
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
  }
}
