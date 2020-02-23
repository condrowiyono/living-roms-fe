<template>
  <b-modal
    v-model="showModal"
    :title="title"
    @hide="handleClose"
    @ok="handleSubmit"
    size="lg"
  >
    <b-form-group label="URL">
      <b-input-group class="mt-3">
        <template v-slot:append>
          <b-button @click="changeLink">
            <b-icon icon="box-arrow-up-right" />
          </b-button>
        </template>
        <b-form-input v-model="form.url" />
      </b-input-group>
    </b-form-group>
    <b-form-group label="Preview">
      <div
        v-if="iframeURL"
        class="h-64"
      >
        <iframe
          :src="iframeURL"
          width="100%"
          title="player"
          height="100%"
          allowfullscreen="allowfullscreen"
        />
      </div>
    </b-form-group>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Modal'
    },
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      iframeURL: ''
    }
  },
  computed: {
    form: {
      get () {
        return this.value
      },
      set (form) {
        this.$emit('input', form)
      }
    },

    showModal: {
      get () {
        return this.show
      },
      set (showModal) {
        this.$emit('input', showModal)
      }
    }
  },

  watch: {
    showModal (val) {
      if (val) {
        this.iframeURL = this.value.url ? this.value.url : ''
      }
    }
  },

  methods: {
    handleSubmit () {
      this.$emit('submit')
    },

    handleClose () {
      this.iframeURL = ''
      this.$emit('close')
    },

    changeLink () {
      this.iframeURL = this.form.url
    }
  }
}
</script>

<style>

</style>
