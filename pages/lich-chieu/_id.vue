<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-row class="px-4">
            <v-col cols="12" sm="6">
              <v-img :src="channel.logo"> </v-img>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card-title class="purple--text pt-0 px-0">
                Kênh {{ channel.name }}
              </v-card-title>
              <v-card-text class="py-0 px-0">
                {{ channel.description }}
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider class="mx-4 mt-2"></v-divider>
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
                    hint="DD/MM/YYYY format"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  @input="onDatePickerInput"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="5" sm="6">
              <v-btn-toggle v-model="quickDateSelect" color="orange">
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
          <v-data-table
            :caption="`Lịch phát sóng kênh ${channel.name} ngày ${computedDateFormatted}`"
            :headers="scheduleTableHeaders"
            :items="scheduleList"
            class="mx-4"
            :no-data-text="'Dữ liệu đang cập nhật!!!'"
            hide-default-footer
            :mobile-breakpoint="300"
            :must-sort="false"
            :items-per-page="100"
          >
            <!-- <template v-slot:item.calories="{ item }">
      <v-chip
        :color="getColor(item.calories)"
        dark
      >
        {{ item.calories }}
      </v-chip>
    </template> -->
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { parseTime } from "@/assets/js/utils";
export default {
  asyncData({ params, store }) {
    const channelId = params.id.split("_").pop();
    return store.dispatch("app/fetchChannel", channelId).then((channel) => {
      return { channel, channelId };
    });
  },
  data() {
    return {
      channelId: null,
      channel: null,
      scheduleTableHeaders: [
        { text: "Time", value: "parsedStartTime", width: 80 },
        { text: "Chương trình", value: "programName" },
      ],
      scheduleList: [],
      selectedDate: new Date().toISOString().substr(0, 10),
      datePickerMenu: false,
      quickDateSelect: 0,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.selectedDate);
    },
  },
  watch: {
    quickDateSelect(newValue) {
      let date = new Date();
      if (newValue === 0) {
        this.selectedDate = date.toISOString().substr(0, 10);
      } else if (newValue === 1) {
        const now = new Date();
        const tomorrow = now.setDate(now.getDate() + 1);
        date = new Date(tomorrow);
        this.selectedDate = date.toISOString().substr(0, 10);
      }
      this.getScheduleList(date);
    },
  },
  mounted() {
    this.getScheduleList(new Date());
  },
  methods: {
    getScheduleList(date) {
      // this.tableLoading = true
      this.fetchScheduleList(this.channelId, date).then((res) => {
        this.scheduleList = res.content;
        this.scheduleList.forEach(
          (schedule) =>
            (schedule.parsedStartTime = parseTime(
              new Date(schedule.startTime),
              "{H}:{i}"
            ))
        );
        // this.tableLoading = false
      });
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    onDatePickerInput() {
      const now = new Date();
      this.datePickerMenu = false;
      const [year, month, day] = this.selectedDate.split("-");
      const date = new Date(year, month - 1, day, 0, 0, 0, 0);
      this.getScheduleList(date);
      debugger;
      if (
        Number(year) === now.getFullYear() &&
        month - 1 === now.getMonth() &&
        Number(day) === now.getDate()
      ) {
        this.quickDateSelect = 0;
      } else if (
        Number(year) === now.getFullYear() &&
        month - 1 === now.getMonth() &&
        Number(day) === now.getDate() + 1
      ) {
        this.quickDateSelect = 1;
      }
    },
  },
};
</script>