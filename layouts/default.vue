<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <navbar-xs
      class="d-block d-sm-none"
      @navbar-icon-click="drawer = !drawer"
    />
    <navbar class="d-none d-sm-block" @navbar-icon-click="drawer = !drawer" />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarXs from './NavbarXs'
import Navbar from './Navbar'
export default {
  components: { NavbarXs, Navbar },
  data() {
    return {
      fixed: false,
      clipped: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Trang chủ',
          to: '/'
        },
        {
          icon: 'mdi-view-list',
          title: 'Lịch phát sóng',
          to: '/lich-phat-song'
        }

      ],
      miniVariant: false,
      drawer: false
    }
  },
  computed: {
    ...mapGetters({
      channelList: 'channelList',
      vipChannelList: 'vipChannelList'
    })
  },
  watch: {},
  methods: {}
}
</script>
