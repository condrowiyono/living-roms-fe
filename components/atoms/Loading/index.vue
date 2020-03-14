<template>
  <div
    v-if="loading"
    class="w-100 flex justify-center py-2"
  >
    <div class="text-center">
      <b-spinner variant="primary" />
    </div>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BSpinner
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>
