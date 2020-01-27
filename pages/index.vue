<template>
  <div>
    <h1 class="mX-20 text-white text-center">
      Living Rooms
    </h1>
    <div class="my-10" />
    <div class="py-20">
      <slider />
    </div>
    <div class="py-20">
      <grid />
    </div>
    <!-- <video-player /> -->
    <iframe src="//gdriveplayer.us/embed2.php?link=1sVTZBYdvLC6VhZwF7RTZQcCGZqt%252Bgr7WNYvdKvIbecOja6imHpOKaRY8IerFc%252FmMYnFiy0yIkioMBeCh4U3aD4jhFVUEfVr9w4qXkINlsEvBiIUbzWgAcGySBHKgIv%252Bl2QD%252BwnPG5dlMc%252BqttisRdn0M20dgmDEpbehT%252BVC%252F0biRR3b54Hg0rV3ahsGDpI98%253D" frameborder="0" width="100%" height="400" allowfullscreen="allowfullscreen"></iframe>
  </div>
</template>

<script>
import Slider from '~/components/Slider'
import Grid from '~/components/Grid'
// import VideoPlayer from '~/components/VideoPlayer'

export default {
  components: {
    Slider,
    Grid
    // VideoPlayer
  }
}
</script>

<style>
</style>
