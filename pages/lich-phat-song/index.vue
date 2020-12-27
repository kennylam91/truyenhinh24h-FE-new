<template>
  <div>
    <v-card>
      <v-card-title class="white--text">
        Lịch phát sóng
      </v-card-title>
      <v-card-text>
        <v-row class="pl-2 pr-4">
          <v-col cols="12" sm="12" md="4" class="px-0">
            <v-autocomplete
              v-model="channelId"
              :items="channelSearchResult"
              :autofocus="true"
              hide-details
              hide-selected
              label="Chọn kênh"
              solo-inverted
              item-text="name"
              item-value="id"
              @change="onSearchChange"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Không tìm thấy dữ liệu!
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:item="{ item }">
                <v-img :src="item.logo" class="search-result-img" />
                <v-list-item-content>
                  <span class="text-caption">{{ item.name }}</span>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="7" sm="6" md="4">
            <v-menu
              v-model="datePickerMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateFormatted"
                  label="Chọn ngày phát sóng"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="selectedDate"
                @input="onDatePickerInput"
              />
            </v-menu>
          </v-col>
          <v-col cols="5" sm="6" md="4">
            <v-btn-toggle v-model="quickDateSelect" color="secondary">
              <v-btn>
                <v-icon class="mx-2">mdi-calendar-clock</v-icon>
                <span class="d-none d-sm-inline">Hôm nay</span>
              </v-btn>
              <v-btn>
                <v-icon class="mx-2">mdi-skip-forward</v-icon>
                <span class="d-none d-sm-inline">Ngày mai</span>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card-text>
      <schedule-table
        :channel-name="channelName"
        :schedule-list="scheduleList"
        :formatted-date="computedDateFormatted"
        :loading="tableLoading"
        :channel-id="channelId"
      />
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ScheduleMixin from '@/components/schedule-mixin'
import ScheduleTable from '@/components/ScheduleTable'
export default {
  components: { ScheduleTable },
  mixins: [ScheduleMixin],
  asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const channelList = store.state.app.channelList
    let channelId = channelList[0].id
    let channelName = channelList[0].name || ''
    const routerQuery = route.query
    let dateObj = new Date()
    let selectedDate = new Date().toISOString().substr(0, 10)
    if (routerQuery) {
      if (routerQuery.kenh) {
        channelName = routerQuery.kenh
        channelId = channelList.find(i => i.name === channelName).id || channelList[0].id
      }
      if (routerQuery.ngay) {
        const dateArr = routerQuery.ngay.split('-')
        if (dateArr.length === 3) {
          dateObj = new Date()
          dateObj.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2])
          selectedDate = dateObj.toISOString().substr(0, 10)
        }
      }
    }
    return { channelList, channelId, channelName, dateObj, selectedDate }
  },
  data() {
    return {
      channelSearchResult: [],
      channelName: ''
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  watch: {
    channelId(val) {
      const found = this.channelList.filter(channel => channel.id === val)
      this.channelName = found && found.length > 0 ? found[0].name : ''
      this.$router.push(
        { path: this.$route.path, query: { kenh: this.channelName, ngay: this.selectedDate }})
    }
  },
  created() {

  },
  mounted() {
    this.channelSearchResult = this.channelList
    this.getScheduleList()
  },
  methods: {
    onSearchChange() {
      this.getScheduleList()
    }
  },
  head() {
    return {
      title: `Truyền hình 24h - Tìm kiếm lịch phát sóng các kênh truyền hình`,
      meta: [
        { hid: 'description', name: 'description',
          content: `Tìm kiếm lịch phát sóng các kênh truyền hình nhanh và chính xác nhất: HBO, Cinemax, Fox movies, Dicovery, ...` }
      ]
    }
  }

}
</script>
