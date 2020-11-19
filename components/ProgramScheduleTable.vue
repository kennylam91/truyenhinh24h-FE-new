<template>
  <div>
    <v-data-table
      :caption="`Lịch phát sóng sắp tới`"
      :headers="scheduleTableHeaders"
      :items="scheduleList"
      class="mx-4"
      :no-data-text="'Dữ liệu đang cập nhật!!!'"
      hide-default-footer
      :mobile-breakpoint="300"
      :must-sort="false"
      :items-per-page="100"
      :loading="loading"
    >
      <template v-slot:[`item.channel`]="{ item }">
        <v-chip
          dark
          color="purple"
          :small="true"
          class="d-sm-none d-inline-block"
          @click=" viewChannelDetail({ name: item.channelName, id: item.channelId }) "
        >
          <v-icon class="mr-1" :small="true">
            mdi-television-play
          </v-icon>
          <span class="text--underline">{{ item.channelName }}</span>
        </v-chip>
        <v-chip
          dark
          color="purple"
          class="d-sm-inline-block d-none"
          @click="
            viewChannelDetail({ name: item.channelName, id: item.channelId })
          "
        >
          <v-icon class="mr-1" :small="false">
            mdi-television-play
          </v-icon>
          <span class="text--underline">{{ item.channelName }}</span>
        </v-chip>
      </template>
      <template v-slot:[`item.startTime`]="{ item }">
        <v-chip color="indigo" :small="true" class="d-sm-none d-inline-block">
          <v-icon class="mr-1" :small="true">
            mdi-clock-time-three-outline
          </v-icon>
          <span>{{ new Date(item.startTime) | parseTimeFullFormat }}</span>
        </v-chip>
        <v-chip color="indigo" class="d-sm-inline-block d-none">
          <v-icon class="mr-1" :small="true">
            mdi-clock-time-three-outline
          </v-icon>
          <span>{{ new Date(item.startTime) | parseTimeFullFormat }}</span>
        </v-chip>
      </template>
      <template v-slot:[`item.notify`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="isShowBellRing(item)"
              :disabled="isBellRingDisabled(item)"
              icon
            >
              <v-icon
                class="pointer"
                color="pink"
                dark
                v-bind="attrs"
                v-on="on"
                @click="addScheduleToGGCal(item)"
              >
                mdi-bell-ring
              </v-icon>
            </v-btn>
          </template>
          <span v-if="!isBellRingDisabled(item)">Thêm vào Google Calendar</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="alert"
      timeout="2000"
      color="success"
      top
      text
      centered
      dark
    >
      Thêm vào Google Calendar thành công

    </v-snackbar>
  </div>
</template>
<script>
import GoogleCalendarMixin from '@/components/google-calendar-mixin'
export default {
  mixins: [GoogleCalendarMixin],
  props: {
    programName: {
      required: true,
      type: [String, null]
    },
    scheduleList: {
      required: true,
      type: Array
    },
    loading: {
      required: false,
      type: Boolean
    }
  },
  data() {
    return {
      scheduleTableHeaders: [
        { text: 'Kênh', value: 'channel', align: 'center' },
        { text: 'Thời gian', value: 'startTime', align: 'center' },
        { text: '', value: 'notify' }
      ]
    }
  }
}
</script>
