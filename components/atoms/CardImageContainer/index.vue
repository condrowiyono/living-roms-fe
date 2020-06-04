<template>
  <div>
    <loading :loading="loading" />
    <div v-if="!loading && data.length">
      <b-form-radio-group
        :id="id"
        v-model="selectedToolbar"
        :options="toolbarOptions"
        @change="handleToolbarChange"
        buttons
        size="sm"
        class="w-100 flex justify-center py-2"
      />
      <div class="image-container">
        <span
          v-for="(image,idx) in data"
          :key="idx"
          @click="handleSelectCard(image.image)"
        >
          <b-img-lazy
            :src="image.thumbnail"
            img-alt="Image"
            class="cursor-pointer m-2"
            blank-color="#ddd"
            width="120"
            fluid
            thumbnail
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormRadioGroup, BImgLazy } from 'bootstrap-vue'
import Loading from '~/components/atoms/Loading'

export default {
  components: {
    BFormRadioGroup,
    BImgLazy,
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
