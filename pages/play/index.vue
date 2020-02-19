<template>
  <div style="height: 100vh">
    <div class="title-bar">
      <nuxt-link to="/">
        <div class="cursor-pointer">
          <i class="fa fa-chevron-left" />
          Dua Garis Biru
        </div>
      </nuxt-link>
    </div>
    <div class="h-full w-full">
      <iframe
        src="//gdriveplayer.us/embed2.php?link=1sVTZBYdvLC6VhZwF7RTZQcCGZqt%252Bgr7WNYvdKvIbecOja6imHpOKaRY8IerFc%252FmMYnFiy0yIkioMBeCh4U3aD4jhFVUEfVr9w4qXkINlsEvBiIUbzWgAcGySBHKgIv%252Bl2QD%252BwnPG5dlMc%252BqttisRdn0M20dgmDEpbehT%252BVC%252F0biRR3b54Hg0rV3ahsGDpI98%253D"
        width="100%"
        title="player"
        height="100%"
        allowfullscreen="allowfullscreen"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.title-bar {
  @apply absolute py-4 pr-4 pl-8;
  text-shadow: 2px 2px 5px #0232;
}
</style>
