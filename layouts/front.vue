<template>
  <div class="front-store">
    <b-navbar
      class="px-16 bg-black"
      toggleable="lg"
      type="dark"
      sticky
      :class="{ 'navbar--solid': !showNavbar }"
    >
      <b-navbar-brand>
        NavBar
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"/>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item>Home</b-nav-item>
          <b-nav-item>Movie</b-nav-item>
          <b-nav-item>TV Series</b-nav-item>
          <b-nav-item>Bola</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <div class="flex items-center">
            <b-form-input
              size="sm"
              class="w-64 bg-black"
              placeholder="Search"
              style="border-radius: 0;"
            />
          </div>

          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <img
                class="w-8 h-8 inline"
                src="https://picsum.photos/250/250/?image=59"
                alt="Image 3"
              />
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 64) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  }
}
</script>
