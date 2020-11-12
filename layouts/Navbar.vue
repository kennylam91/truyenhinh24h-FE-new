<template>
  <div>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="onNavbarIconClick" />
      <v-toolbar-title>
        <router-link class="white--text" to="/">{{ title }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-autocomplete
        v-model="model"
        :items="searchAllResults"
        :loading="isLoading"
        :search-input.sync="search"
        :autofocus="true"
        clearable
        hide-details
        hide-selected
        label="Tìm kiếm kênh, chương trình ..."
        solo
        dense
        no-filter
        item-text="name"
        item-value="id"
        append-icon=""
        prepend-inner-icon="mdi-magnify"
        @blur="searchAllResults = []"
        @change="onSearchChange"
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title> Không tìm thấy dữ liệu! </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:item="{ item }">
          <v-img :src="item.logo" class="search-result-img"> </v-img>
          <v-list-item-content>
            <span class="text-caption">{{ item.name }}</span>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-app-bar>
  </div>
</template>
<script>
import NavbarMixin from "./navbar-mixin";
export default {
  mixins: [NavbarMixin]
};
</script>