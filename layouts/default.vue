<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="!isShowSearch" v-text="title" />
      <v-autocomplete
        v-if="isShowSearch"
        v-model="model"
        :items="searchAllResults"
        :loading="isLoading"
        :search-input.sync="search"
        auto-focus="true"
        clearable
        hide-details
        hide-selected
        label="Search for channels, programs"
        solo
        dense
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title> Không tìm thấy dữ liệu! </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:item="{ item }">
          <v-img :src="item.logo" class="pointer"> </v-img>
          <v-list-item-content>
            <!-- <v-list-item-title v-text="item.name"></v-list-item-title> -->
            <!-- <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle> -->
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>
      <v-spacer></v-spacer>

      <v-btn icon v-if="!isShowSearch" @click="isShowSearch = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      title: "Truyenhinh24h",
      isShowSearch: false,
      isLoading: false,
      items: [],
      model: null,
      tab: null,
      searchAllResults: [],
      search: null,
    };
  },
  computed: {
    ...mapGetters({
      channelList: "channelList",
      vipChannelList: "vipChannelList",
    }),
  },
  watch: {
    search(val) {
      this.isLoading = true;
      const lowerCaseSearchText = val.trim().toLowerCase();
      if (lowerCaseSearchText.length < 2) {
      } else {
        this.searchAllResults = [];
        const channelSearchResult = this.channelList.filter((channel) => {
          return channel.name.toLowerCase().includes(lowerCaseSearchText);
        });

        this.searchAllResults = this.searchAllResults.concat(
          channelSearchResult
        );
        this.$store
          .dispatch("app/searchProgram", {
            searchName: val,
            page: 1,
            limit: 8,
          })
          .then((res) => {
            this.searchAllResults = this.searchAllResults.concat(res.content);
          })
          .finally(() => {
            this.isLoading = false
          })
        this.visible = true;
      }
    },
  },
  methods: {},
};
</script>
