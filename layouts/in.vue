<template>
  <div class="back-office">
    <b-navbar class="navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <b-navbar-brand class="col-sm-3 col-md-2 mr-0">
        NavBar
      </b-navbar-brand>
      <b-navbar-nav class="w-full px-4">
        <input class="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search">
      </b-navbar-nav>
      <b-navbar-nav class="pr-8">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            Nama
          </template>
          <b-dropdown-item @click="$router.push('/')">
            Ke Halaman Utama
          </b-dropdown-item>
          <b-dropdown-item @click="handleLogout">
            Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-container fluid>
      <b-row>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <b-nav class="flex-column">
              <b-nav-item :to="{ name: 'in-movie' }">
                <b-icon-house /> Movie
              </b-nav-item>
              <b-nav-item :to="{ name: 'in-person' }">
                <b-icon-house /> People
              </b-nav-item>
            </b-nav>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Pengaturan Akun</span>
            </h6>
          </div>
        </nav>
        <nuxt />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavItem,
  BNavItemDropdown,
  BDropdownItem,
  BContainer,
  BRow,
  BNav,
  BIconHouse
} from 'bootstrap-vue'

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BNavItem,
    BNavItemDropdown,
    BDropdownItem,
    BContainer,
    BRow,
    BNav,
    BIconHouse
  },

  methods: {
    ...mapActions({
      logout: 'auth/LOGOUT'
    }),

    handleLogout () {
      this.logout()
      this.$router.push('/')
    }
  }
}
</script>
