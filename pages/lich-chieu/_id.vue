<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-img :src="channel.logo"> </v-img>
          <v-card-title class="purple--text">
            Kênh {{ channel.name }}
          </v-card-title>
          <v-card-text>
            {{ channel.description }}
          </v-card-text>
          <v-divider class="mx-4 my-4"></v-divider>
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
                v-model="selectedDate"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="selectedDate"
              @input="datePickerMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-data-table
            :caption="`Lịch phát sóng kênh ${channel.name}`"
            :headers="scheduleTableHeaders"
            :items="scheduleList"
            class=""
            :no-data-text="'Dữ liệu đang cập nhật!!!'"
            hide-default-footer
            :mobile-breakpoint="300"
            :must-sort="false"
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
      selectedDate: new Date().toString(),
      datePickerMenu: false
    };
  },
  mounted() {
    this.getScheduleList();
  },
  methods: {
    getScheduleList() {
      // this.tableLoading = true
      this.fetchScheduleList(this.channelId, new Date(this.selectedDate)).then((res) => {
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
  },
};
</script>