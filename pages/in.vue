<template>
  <div class="main col-md-10 ml-sm-auto col-lg-10 px-4 pb-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1 class="h2">
        {{ header }}
      </h1>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'in',
  middleware: 'inMiddleware',
  computed: {
    ...mapGetters({
      header: 'common/header'
    })
  }
}
</script>
