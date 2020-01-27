import _ from 'lodash'
import movieList from './movie'

export default {
  name: 'Grid',

  directives: {
    mouse: {
      bind (el, binding) {
        el.addEventListener(binding.arg, binding.value.handler)
      },

      update (el, binding) {
        el.addEventListener(binding.arg, binding.value.handler)
      }
    }
  },

  data () {
    return {
      ratio: 1.125,
      distanceMultipler: 15,
      contentContainerSize: 8,
      contentContainer: [],
      contentData: movieList,
      showCaseContainer: [],
      timeoutID: '',
      selectedDetailMenu: 'overview',
      detailMenus: ['overview', 'trailer', 'details'],
      selectedSlide: null,
      selectedSlideContainer: []
    }
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

    hideShowcase (event) {
      const selectedContainerId = event.target.dataset.containerIndex * 1
      this.setStyleProperty(event.target, { visibility: 'hidden', opacity: '0', transform: 'scale(1, 1)', transition: 'transform .4s cubic-bezier( 0.5 , 0, 0.1 ,1), opacity .4s, visibility .6s' })
      const startPos = 0
      const endPos = this.contentContainerSize - 1
      for (let index = startPos; index <= endPos; index++) {
        if (this.$refs[`grid-${selectedContainerId}`][index]) {
          this.setStyleProperty(this.$refs[`grid-${selectedContainerId}`][index], { transform: `translateX(0)`, transition: 'transform 0.3s cubic-bezier( 0.5 , 0, 0.1 ,1)' })
        }
      }
    },

    unselectSlide () {
      clearTimeout(this.timeoutID)
    },

    setStyleProperty (element, styles) {
      Object.assign(element.style, styles)
    },

    contentIndex (element) {
      return element.dataset.index * 1
    },

    onMouseShowShowcase (event) {
      const selectedContentId = this.contentIndex(event.target)
      const selectedContainerId = event.target.dataset.containerIndex * 1
      if (isNaN(selectedContentId)) { return }
      if (this.selectedSlide) { return }
      this.timeoutID = setTimeout(() => {
        const startPos = 0
        const endPos = this.contentContainerSize - 1

        if (event.target.children.length > 0) {
          const styles = {
            visibility: 'visible',
            opacity: '1',
            transform: `scale(calc(2.5 * 1.125), 1.125)`,
            transition: 'transform 0.3s cubic-bezier( 0.5 , 0, 0.1 ,1)'
          }
          let transformOrigin = 'center center'
          if (selectedContentId === startPos) {
            styles.transform = `scale(calc(2.5 * 1.125), 1.125)`
            transformOrigin = 'center left'
          } else if (selectedContentId === endPos) {
            styles.transform = `scale(calc(2.5 * 1.125), 1.125)`
            transformOrigin = 'center right'
          }
          Object.assign(styles, { 'transform-origin': transformOrigin })
          this.setStyleProperty(event.target.children[0], styles)
        }

        for (let index = startPos; index <= endPos; index++) {
          let transitionDistance = event.target.clientWidth * ((this.ratio - 1) / 2)
          if (selectedContentId === startPos || selectedContentId === endPos) {
            transitionDistance = event.target.clientWidth * (this.ratio - 1)
          }
          let direction = 0

          if (index < selectedContentId) {
            direction = -1
          } else if (index > selectedContentId) {
            direction = 1
          }
          this.setStyleProperty(this.$refs[`grid-${selectedContainerId}`][index], { transform: `translateX(${transitionDistance * this.distanceMultipler * direction}px)`, transition: 'transform 0.3s cubic-bezier( 0.5 , 0, 0.1 ,1)' })
        }
      }, 500)
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
      this.contentContainer = _.chunk(this.contentData, this.contentContainerSize)
      this.resetSelectedSlideContainer()
    },

    resetSelectedSlideContainer () {
      this.selectedSlideContainer = []
      this.contentContainer.forEach(() => {
        this.selectedSlideContainer.push(false)
      })
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
  }
}
