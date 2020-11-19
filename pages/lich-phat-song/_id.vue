<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-row class="px-4">
            <v-col cols="12" sm="6" md="4">
              <v-img :src="channel.logo" />
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-card-title class="purple--text pt-0 px-0">
                Kênh {{ channel.name }}
              </v-card-title>
              <v-card-text class="d-sm-block d-none px-0">
                {{ channel.description }}
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider class="mx-4 mt-0" />
          <v-row class="px-4">
            <v-col cols="7" sm="6">
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
            <v-col cols="5" sm="6">
              <v-btn-toggle v-model="quickDateSelect" color="white">
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
          <schedule-table
            :channel-name="channel.name"
            :schedule-list="scheduleList"
            :formatted-date="computedDateFormatted"
            :loading="tableLoading"
          />
          <v-divider class="mx-4 mt-3" />
          <v-card-text class="d-sm-none">
            {{ channel.description }}
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ScheduleMixin from '@/components/schedule-mixin'
import ScheduleTable from '@/components/ScheduleTable'
export default {
  components: { ScheduleTable },
  mixins: [ScheduleMixin],
  asyncData({ params, store }) {
    const channelList = store.state.app.channelList
    const channelId = params.id.split('_').pop()
    return store.dispatch('app/fetchChannel', channelId).then(channel => {
      return { channel, channelId, channelList }
    })
  },
  data() {
    return {
      channel: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getScheduleList(new Date())
  },
  methods: {},
  head() {
    return {
      title: `Truyền hình 24h - Lịch phát sóng kênh ${this.channel.name}`,
      meta: [
        { hid: 'description', name: 'description',
          content: `Cập nhật lịch phát sóng hàng ngày và tổng hợp các chương trình hay nhất trên kênh ${this.channel.name}. ` }
      ]
    }
  }
}
</script>
