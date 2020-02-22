<template>
  <div>
    Header
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'in',
  middleware: 'inMiddleware'
}
</script>
