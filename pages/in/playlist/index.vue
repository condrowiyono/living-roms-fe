<template>
  <div>
    Playlist
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit('common/SET_HEADER', 'Playlist')
  }
}
</script>
