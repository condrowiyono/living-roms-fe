<template>
  <video-player
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    :trackList="playerOptions.trackList"
    @ready="playerReadied"
  />
</template>

<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  data () {
    return {
      playerOptions: {
        // videojs options
        trackList: [{
          default: true,
          id: 'sub',
          kind: 'subtitles',
          language: 'id',
          src: 'https://raw.githubusercontent.com/condrowiyono/srt_vtt/master/01.vtt'
        }],
        language: 'id',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'https://r4---sn-npoeenez.googlevideo.com/videoplayback?expire=1579597932&ei=S6QmXrfxLPaCssUPvri10AM&ip=157.245.151.183&id=814abc831249a2a4&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-npoeenez&ms=nxu&mv=m&mvi=3&pl=24&sc=yes&ttl=transient&susc=ph&app=fife&mime=video/mp4&dur=3753.970&lmt=1579548311353061&mt=1579590624&sparams=expire,ei,ip,id,itag,source,requiressl,ttl,susc,app,mime,dur,lmt&sig=ALgxI2wwRgIhALKzHDYOvwbp8ct7NxccUogtI7k8-AoAGR97O4AElq8KAiEA9wUgFvZviEUrpVnI8NuDop8BIjJMXddhiAJ1ri3ATd8=&lsparams=mm,mn,ms,mv,mvi,pl,sc&lsig=AHylml4wRQIgIxpx2qaADbuK1FsR4DP4MyLyrEQ6Ewo85XMSRPQ1XpICIQClJ3KINkVJ-xA_K4JZthA5nj4uOlpIxRDga-damrf7IA=='
        }],
        poster: '/static/images/author.jpg'
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  mounted () {
    console.log('this is current player instance object', this.player)
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>
