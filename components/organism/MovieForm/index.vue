<template>
  <div>
    <b-row>
      <b-col cols="8">
        <b-card
          class="mb-4"
          header="Profil Movie"
        >
          <b-form-group
            label="Title"
            label-cols="3"
          >
            <b-form-input v-model="form.title" />
          </b-form-group>
          <b-form-group
            label="Genre"
            label-cols="3"
          >
            <b-form-tags
              v-model="form.genres"
              placeholder=""
            />
          </b-form-group>
          <b-form-group
            label="Rated"
            label-cols="3"
          >
            <b-form-input v-model="form.rated" />
          </b-form-group>
          <b-form-group
            label="Director"
            label-cols="3"
          >
            <b-form-input v-model="form.director" />
          </b-form-group>
          <b-form-group
            label="Release Date"
            label-cols="3"
          >
            <b-form-input v-model="form.release_date" />
          </b-form-group>
          <b-form-group
            label="Production"
            label-cols="3"
          >
            <b-form-tags
              v-model="form.productions"
              placeholder=""
            />
          </b-form-group>
          <b-form-group
            label="Countries"
            label-cols="3"
          >
            <b-form-tags
              v-model="form.countries"
              placeholder=""
            />
          </b-form-group>
          <b-form-group
            label="Original Language"
            label-cols="3"
          >
            <b-form-input v-model="form.original_language" />
          </b-form-group>
          <b-form-group
            label="Runtime (m)"
            label-cols="3"
          >
            <b-form-input v-model="form.runtime" />
          </b-form-group>
        </b-card>
        <b-card
          class="mb-4"
          header="Plot / Overview"
        >
          <b-form-group
            label="Overview"
            label-cols="3"
          >
            <b-form-textarea
              v-model="form.overview"
              rows="3"
              max-rows="6"
            />
          </b-form-group>
        </b-card>
        <b-card
          class="mb-4"
          header="Image"
        >
          <b-form-group
            label="Posters"
            label-cols="3"
          >
            <b-container
              class="bg-light rounded border"
              style="min-height: 100px"
            >
              <div
                v-for="(image, idx) in form.posters"
                :key="idx"
                class="d-inline-block my-2 mr-2 border bg-white p-2 rounded"
              >
                <b-img-lazy
                  :src="image.path"
                  width="80"
                />
                <div class="justify-content-end mt-2">
                  <b-button-group class="w-100">
                    <b-button
                      @click="handleOpenPoster(idx)"
                      size="sm"
                      variant="light"
                    >
                      <b-icon-pencil />
                    </b-button>
                    <b-button
                      @click="handleRemovePoster(idx)"
                      size="sm"
                      variant="light"
                    >
                      <b-icon-trash />
                    </b-button>
                  </b-button-group>
                </div>
              </div>
              <div class="d-inline-block my-2 mr-2 border bg-white p-2 rounded">
                <div
                  class="d-flex justify-content-center align-content-center p-4 cursor-pointer"
                  @click="handleOpenPoster(null)"
                >
                  <b-icon-plus :scale="2"/>
                </div>
                <div class="justify-content-end">
                  <b-button-group class="w-100">
                    <b-button
                      size="sm"
                      variant="light"
                      disabled
                    >
                      <b-icon-pencil />
                    </b-button>
                    <b-button
                      size="sm"
                      variant="light"
                      disabled
                    >
                      <b-icon-trash />
                    </b-button>
                  </b-button-group>
                </div>
              </div>
            </b-container>
            <span class="small text-secondary"> *Gambar Pertama adalah gambar utama </span>
          </b-form-group>
          <b-form-group
            label="Banners"
            label-cols="3"
          >
            <b-container
              class="bg-light rounded border"
              style="min-height: 100px"
            >
              <div
                v-for="(image, idx) in form.banners"
                :key="idx"
                class="d-inline-block my-2 mr-2 border bg-white p-2 rounded"
              >
                <b-img-lazy
                  :src="image.path"
                  width="160"
                />
                <div class="justify-content-end mt-2">
                  <b-button-group class="w-100">
                    <b-button
                      @click="handleOpenBanner(idx)"
                      size="sm"
                      variant="light"
                    >
                      <b-icon-pencil />
                    </b-button>
                    <b-button
                      @click="handleRemoveBanner(idx)"
                      size="sm"
                      variant="light"
                    >
                      <b-icon-trash />
                    </b-button>
                  </b-button-group>
                </div>
              </div>
              <div class="d-inline-block my-2 mr-2 border bg-white p-2 rounded">
                <div
                  class="d-flex justify-content-center align-content-center p-4 cursor-pointer"
                  @click="handleOpenBanner(null)"
                >
                  <b-icon-plus :scale="2"/>
                </div>
                <div class="justify-content-end">
                  <b-button-group class="w-100">
                    <b-button
                      size="sm"
                      variant="light"
                      disabled
                    >
                      <b-icon-pencil />
                    </b-button>
                    <b-button
                      size="sm"
                      variant="light"
                      disabled
                    >
                      <b-icon-trash />
                    </b-button>
                  </b-button-group>
                </div>
              </div>
            </b-container>
            <span class="small text-secondary"> *Gambar Pertama adalah gambar utama </span>
          </b-form-group>
        </b-card>
        <b-card
          class="mb-4"
          header="Videos"
        >
          <b-form-group
            label="Videos"
            label-cols="3"
          >
            <b-list-group>
              <b-list-group-item
                v-for="(video, idx) in this.form.videos"
                :key="idx"
                class="d-flex justify-content-between align-items-center"
              >
                <div>
                  <font-awesome-icon
                    v-if="video.source === 'youtube'"
                    :icon="['fab', 'youtube']"
                  />
                  <span class="small"> {{ video.player_url }} </span>
                </div>
                <b-button-group>
                  <b-button
                    size="sm"
                    variant="light"
                    :href="video.player_url"
                    target="_blank"
                  >
                    <b-icon-arrow-up-right />
                  </b-button>
                  <b-button
                    @click="handleOpenVideos(idx)"
                    size="sm"
                    variant="light"
                  >
                    <b-icon-pencil />
                  </b-button>
                  <b-button
                    @click="handleRemoveVideos(idx)"
                    size="sm"
                    variant="light"
                  >
                    <b-icon-trash />
                  </b-button>
                </b-button-group>
              </b-list-group-item>
              <b-list-group-item
                class="bg-light cursor-pointer"
                @click="handleOpenVideos(null)"
              >
                <b-icon-plus /> Tambah
              </b-list-group-item>
            </b-list-group>
          </b-form-group>
           <b-form-group
            label="Player"
            label-cols="3"
          >
            <b-list-group>
              <b-list-group-item
                v-if="form.player && form.player.player_url"
                class="d-flex justify-content-between align-items-center"
              >
                <div>
                  <font-awesome-icon
                    v-if="form.player.source === 'youtube'"
                    :icon="['fab', 'youtube']"
                  />
                  <span class="small"> {{ form.player.player_url }} </span>
                </div>
                <b-button-group>
                  <b-button
                    size="sm"
                    variant="light"
                    :href="form.player.player_url"
                    target="_blank"
                  >
                    <b-icon-arrow-up-right />
                  </b-button>
                  <b-button
                    @click="handleOpenPlayer"
                    size="sm"
                    variant="light"
                  >
                    <b-icon-pencil />
                  </b-button>
                  <b-button
                    @click="handleDeletePlayer"
                    size="sm"
                    variant="light"
                  >
                    <b-icon-trash />
                  </b-button>
                </b-button-group>
              </b-list-group-item>
              <b-list-group-item
                v-else
                class="bg-light cursor-pointer"
                @click="handleOpenPlayer"
              >
                <b-icon-plus /> Tambah
              </b-list-group-item>
            </b-list-group>
          </b-form-group>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          class="mb-4"
          header="Actors"
        >
          <b-list-group class="small">
            <b-list-group-item
              v-for="(actor, idx) in form.actors"
              :key="idx"
              class="d-flex justify-content-between align-items-center"
            >
              {{ actor.name }}
              <b-button-group>
                <b-button
                  v-if="false"
                  size="sm"
                  variant="light"
                >
                  <b-icon-pencil />
                </b-button>
                <b-button
                  size="sm"
                  variant="light"
                >
                  <b-icon-trash />
                </b-button>
              </b-button-group>
            </b-list-group-item>
            <b-list-group-item class="bg-light cursor-pointer">
              <b-icon-plus /> Tambah
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card
          class="mb-4"
          header="Other Information"
        >
          <b-form-group
            label="TMDB ID"
            label-cols="3"
          >
            <b-form-input
              v-model="form.tmdb_id"
              disabled
            />
          </b-form-group>
          <b-form-group
            label="IMDB ID"
            label-cols="3"
          >
            <b-form-input
              v-model="form.imdb_id"
              disabled
            />
          </b-form-group>
          <b-form-group
            label="IMDB Rating"
            label-cols="3"
          >
            <b-form-input v-model="form.imdb_rating" />
          </b-form-group>
          <b-form-group
            label="Awards"
            label-cols="3"
          >
            <b-form-textarea
              v-model="form.awards"
              rows="3"
              max-rows="6"
            />
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>

    <image-chooser
      :show="dialog.poster"
      :title="'Poster'"
      :value="dialog.formPoster"
      @close="handleClosePoster"
      @submit="handleSubmitPoster"
    />
    <image-chooser
      :show="dialog.banner"
      :title="'Banner'"
      :value="dialog.formBanner"
      @close="handleCloseBanner"
      @submit="handleSubmitBanner"
    />

    <link-preview
      :show="dialog.player"
      :title="'Player Preview'"
      :value="dialog.formPlayer"
      :link-type="dialog.linkType"
      @close="handleClosePlayer"
      @submit="handleSubmitPlayer"
    />
  </div>
</template>

<script>

import {
  BRow,
  BCol,
  BCard,
  BFormGroup,
  BFormInput,
  BFormTags,
  BFormTextarea,
  BListGroup,
  BListGroupItem,
  BContainer,
  BImgLazy,
  BButton,
  BIconPencil,
  BIconTrash,
  BIconPlus,
  BIconArrowUpRight,
  BButtonGroup
} from 'bootstrap-vue'

import ImageChooser from '~/components/molecules/ImageChooser'
import LinkPreview from '~/components/molecules/LinkPreview'

export default {
  name: 'MovieForm',
  components: {
    ImageChooser,
    LinkPreview,
    BRow,
    BCol,
    BCard,
    BFormGroup,
    BFormInput,
    BFormTags,
    BFormTextarea,
    BListGroup,
    BListGroupItem,
    BContainer,
    BImgLazy,
    BButton,
    BIconPencil,
    BIconTrash,
    BIconPlus,
    BIconArrowUpRight,
    BButtonGroup
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dialog: {
        poster: false,
        banner: false,
        player: false,
        linkType: 'player',
        formPoster: {
          url: '',
          idx: null
        },
        formBanner: {
          url: '',
          idx: null
        },
        formPlayer: {
          type: 'movie',
          source: '',
          player_url: ''
        }
      }
    }
  },

  computed: {
    form: {
      get () {
        return this.value
      },
      set (form) {
        this.emitInput(form)
      }
    }
  },

  methods: {
    emitInput (form) {
      this.$emit('input', {
        ...this.value,
        ...form
      })
    },

    handleOpenPoster (idx) {
      this.dialog.formPoster.idx = idx
      this.dialog.poster = true
    },

    handleClosePoster () {
      this.dialog.poster = false
    },

    handleSubmitPoster () {
      const idx = this.dialog.formPoster.idx
      const poster = { path: this.dialog.formPoster.url }

      this.dialog.poster = false

      if (idx === null) {
        this.form.posters = [
          ...this.form.posters,
          poster
        ]
      } else {
        this.form.posters[idx] = poster
      }
    },

    handleRemovePoster (idx) {
      this.form.posters.splice(idx, 1)
    },

    handleOpenBanner (idx) {
      this.dialog.formBanner.idx = idx
      this.dialog.banner = true
    },

    handleCloseBanner () {
      this.dialog.banner = false
    },

    handleSubmitBanner () {
      const idx = this.dialog.formBanner.idx
      const banner = { path: this.dialog.formBanner.url }

      this.dialog.banner = false
      if (idx === null) {
        this.form.banners = [
          ...this.form.banners,
          banner
        ]
      } else {
        this.form.banners[idx] = banner
      }
    },

    handleRemoveBanner (idx) {
      this.form.banners.splice(idx, 1)
    },

    handleOpenPlayer () {
      this.dialog.linkType = 'player'
      this.dialog.formPlayer = this.form.player
      this.dialog.player = true
    },

    handleClosePlayer () {
      this.dialog.player = false
    },

    handleSubmitPlayer (linkType) {
      if (linkType === 'player') {
        this.form.player = this.dialog.formPlayer
      } else {
        this.handleSubmitVideos()
      }
      this.dialog.player = false
    },

    handleDeletePlayer () {
      this.form.player = {
        type: 'movie',
        source: '',
        player_url: ''
      }
    },

    handleOpenVideos (id) {
      this.dialog.linkType = 'videos'
      if (id !== null) {
        this.dialog.formPlayer = {
          id,
          ...this.form.videos[id]
        }
      } else {
        this.dialog.formPlayer = {
          type: '',
          source: '',
          player_url: ''
        }
      }
      this.dialog.player = true
    },

    handleCloseVideos () {
      this.dialog.player = false
    },

    handleRemoveVideos (idx) {
      this.form.videos.splice(idx, 1)
    },

    handleSubmitVideos () {
      const id = this.dialog.formPlayer.id
      if (id) {
        this.form.videos[id] = this.dialog.formPlayer
      } else {
        this.form.videos.push(this.dialog.formPlayer)
      }
    }
  }
}
</script>

<style>

</style>
