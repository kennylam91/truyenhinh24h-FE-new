<template>
  <div>
    <v-data-table
      :key="scheduleTableKey"
      :caption="`Lịch phát sóng kênh ${channelName} ngày ${formattedDate}`"
      :headers="scheduleTableHeaders"
      :items="scheduleList"
      class="mx-0"
      :no-data-text="'Dữ liệu đang cập nhật!!!'"
      hide-default-footer
      :mobile-breakpoint="300"
      :must-sort="false"
      :items-per-page="100"
      :loading="loading"
    >
      <template v-slot:[`item.parsedStartTime`]="{ item }">
        <span class="white--text">{{ item.parsedStartTime }}</span>
      </template>
      <template v-slot:[`item.programName`]="{ item }">
        <div
          v-if="item.programId"
          class="pointer text--underline orange--text"
          @click="viewProgramDetail({id: item.programId, name: item.programName})"
        >
          {{ item.programName }}
        </div>
        <div v-else class="orange--text">
          {{ item.programName }}
        </div>
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
            <v-icon v-if="isBroadCasting(item)" color="success" class="px-2">
              mdi-television-classic
            </v-icon>
          </template>
          <span>Thêm vào Google Calendar</span>
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
    channelName: {
      required: true,
      type: [String, null]
    },
    scheduleList: {
      required: true,
      type: Array
    },
    formattedDate: {
      required: true,
      type: String
    },
    loading: {
      required: false,
      type: Boolean
    }
  },
  data() {
    return {
      scheduleTableHeaders: [
        { text: 'Time', value: 'parsedStartTime', width: 80 },
        { text: 'Chương trình', value: 'programName' },
        { text: '', value: 'notify' }
      ]

    }
  },
  methods: {

  }
}
</script>
