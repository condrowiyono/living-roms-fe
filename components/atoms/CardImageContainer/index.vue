<template>
  <div>
    <loading :loading="loading" />
    <b-form-radio-group
      v-if="!loading && data.length"
      :id="id"
      v-model="selectedToolbar"
      :options="toolbarOptions"
      buttons
      size="sm"
      @change="handleToolbarChange"
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
          img-alt="Image"
          overlay
          class="cursor-pointer"
          @click="handleSelectCard(image.image)"
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

  data () {
    return {
      selectedToolbar: this.defaultSelectedToolbar ? this.defaultSelectedToolbar : null
    }
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
