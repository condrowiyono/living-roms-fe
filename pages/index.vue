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
  </div>
</template>

<script>
import Slider from '~/components/Slider'
import Grid from '~/components/Grid'

export default {
  components: {
    Slider,
    Grid
  }
}
</script>

<style>
</style>
