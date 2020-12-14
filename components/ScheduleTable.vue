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
      <template v-slot:header.notify="{ }">

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="amber"
              dark
              v-bind="attrs"
              icon
              v-on="on"
              @click="userReportDialog = true"
            >
              <v-icon>
                mdi-alert
              </v-icon>
            </v-btn>
          </template>
          <span>Báo lỗi</span>
        </v-tooltip>
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
      timeout="3000"
      color="success"
      top
      text
      centered
      dark
    >
      {{ alertContent }}
    </v-snackbar>

    <v-dialog
      v-model="userReportDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h6 orange--text">
          Report lịch phát sóng lỗi
        </v-card-title>
        <v-card-text class="text-subtitle-1">
          Kênh: {{ channelName }}
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="userReport.content"
            label="Nội dung"
            @keypress.enter.prevent="onReport"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="onReport"
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    },
    channelId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      scheduleTableHeaders: [
        { text: 'Time', value: 'parsedStartTime', width: 80 },
        { text: 'Chương trình', value: 'programName' },
        { text: '', value: 'notify', sortable: false }
      ],
      userReportDialog: false,
      userReport: {
        channelId: null,
        content: '',
        date: ''
      },
      alertContent: 'Thêm vào Google Calendar thành công'

    }
  },
  methods: {
    onReport() {
      this.userReportDialog = false
      this.userReport.channelId = this.channelId
      this.userReport.date = this.formattedDate
      this.$store.dispatch('app/createUserReport', this.userReport).then(() => {
        this.alertContent = 'Report thành công. Cảm ơn bạn, chúng tôi sẽ kiểm tra sớm nhất!'
        this.alert = true
      })
    }
  }
}
</script>
