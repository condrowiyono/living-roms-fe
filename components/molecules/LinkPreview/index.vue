<template>
  <b-modal
    v-model="showModal"
    :title="title"
    @hide="handleClose"
    @ok="handleSubmit"
    size="lg"
  >
    <b-form-group
      label-cols="3"
      label="Pilih Penyedia"
    >
      <b-form-select
        v-model="form.source"
        :options="options"
        @change="handleSourceChange"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="form.source === 'youtube'"
      label="Video ID"
    >
      <b-form-input
        v-model="youtubeID"
        v-on:keyup.enter="handleYoutubeID"
        debounce="500"
        class="mb-2"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="form.source=== 'url'"
      label="URL"
    >
      <b-form-input
        v-model="form.player_url"
        v-on:keyup.enter="handleURL"
        class="mb-2"
        debounce="500"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      v-if="form.source === 'gdriveplayerus'"
      label="IMDB ID"
      class="mb-2"
    >
      <b-form-input
        v-model="tmdbID"
        v-on:keyup.enter="handleGDrivePlayer"
        class="mb-2"
        debounce="500"
      />
    </b-form-group>
    <b-form-group
      label-cols="3"
      label="URL"
    >
      <b-form-input
        v-model="iframeURL"
        class="my-2"
        disabled
      />
    </b-form-group>
    <b-embed
      :src="iframeURL"
      type="iframe"
      aspect="16by9"
      allowfullscreen
    />
  </b-modal>
</template>

<script>
import { BModal, BFormGroup, BFormInput, BFormSelect, BEmbed } from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BEmbed
  },

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
    },
    linkType: {
      type: String,
      default: 'player'
    }
  },

  data () {
    return {
      youtubeID: '',
      iframeURL: '',
      tmdbID: '',
      options: [
        { value: null, text: 'Pilih Penyedia' },
        { value: 'youtube', text: 'Youtube' },
        { value: 'gdriveplayerus', text: 'GDrivePlayer.us' },
        { value: 'url', text: 'URL' }
      ],
      selectedSource: null
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
        this.iframeURL = this.value.player_url ? this.value.player_url : ''
      }
    },

    'form.source': {
      handler (val) {
        this.selectedSource = val
      }
    }
  },

  methods: {
    handleSubmit () {
      this.$emit('submit', this.linkType)
    },

    handleClose () {
      this.iframeURL = ''
      this.$emit('close')
    },

    handleSourceChange () {
      this.iframeURL = ''
    },

    handleYoutubeID () {
      const url = `https://www.youtube-nocookie.com/embed/${this.youtubeID}?controls=0&rel=0`
      this.iframeURL = url
      this.form.player_url = url
    },

    handleGDrivePlayer () {
      const url = `https://database.gdriveplayer.us/player.php?imdb=${this.tmdbID}`
      this.iframeURL = url
      this.form.player_url = url
    },

    handleURL () {
      this.iframeURL = this.form.player_url
    }
  }
}
</script>

<style>

</style>
