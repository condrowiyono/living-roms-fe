<template>
  <div>
    <loading :loading="loading" />
    <b-form-radio-group
      v-if="!loading && data.length"
      :id="id"
      v-model="selectedToolbar"
      :options="toolbarOptions"
      @change="handleToolbarChange"
      buttons
      size="sm"
      class="w-100 flex justify-center py-2"
    />
    <div class="image-container">
      <b-card-group
        v-if="!loading"
        columns
      >
        <b-card
          v-for="image in data"
          :key="image.thumbnail"
          :img-src="image.thumbnail"
          @click="handleSelectCard(image.image)"
          img-alt="Image"
          overlay
          class="cursor-pointer"
        />
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { BFormRadioGroup, BCardGroup, BCard } from 'bootstrap-vue'
import Loading from '~/components/atoms/Loading'

export default {
  components: {
    BFormRadioGroup,
    BCardGroup,
    BCard,
    Loading
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true
    },

    data: {
      type: Array,
      default: () => [],
      required: true
    },

    toolbarOptions: {
      type: Array,
      default: () => []
    },

    defaultSelectedToolbar: {
      default: null
    },

    id: {
      type: String,
      default: 'image-result'
    }
  },

  data () {
    return {
      selectedToolbar: this.defaultSelectedToolbar ? this.defaultSelectedToolbar : null
    }
  },

  methods: {
    handleToolbarChange (val) {
      this.$emit('toolbar-change', val)
    },

    handleSelectCard (val) {
      this.$emit('select-card', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-container {
  max-height: 480px;
  overflow-y: auto;
}
</style>
