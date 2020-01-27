import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'

Vue.use(VueYouTubeEmbed)
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */)
