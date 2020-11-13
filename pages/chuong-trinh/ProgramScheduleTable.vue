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
      <template v-slot:item.channel="{ item }">
        <v-chip
          dark
          color="purple"
          @click="
            viewChannelDetail({ name: item.channelName, id: item.channelId })
          "
        >
          <v-icon class="mr-1" :small="true">
            mdi-television-play
          </v-icon>
          {{ item.channelName }}
        </v-chip>
      </template>
      <template v-slot:item.startTime="{ item }">
        <v-chip color="indigo" >
          <v-icon class="mr-1">
            mdi-clock-time-three-outline
          </v-icon>
          <span>{{ new Date(item.startTime) | parseTimeFullFormat }}</span>
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scheduleTableHeaders: [
        { text: "Kênh", value: "channel", align: "center" },
        { text: "Thời gian", value: "startTime", align: "center" }
      ]
    };
  },
  props: {
    programName: {
      required: true,
      type: String | null
    },
    scheduleList: {
      required: true,
      type: Array
    },
    loading: {
      required: false,
      type: Boolean
    }
  }
};
</script>
