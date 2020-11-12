<template>
  <div>
    <v-data-table
      :caption="`Lịch phát sóng kênh ${channelName} ngày ${formattedDate}`"
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
      <!-- <template v-slot:item.calories="{ item }">
      <v-chip
        :color="getColor(item.calories)"
        dark
      >
        {{ item.calories }}
      </v-chip>
    </template> -->
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scheduleTableHeaders: [
        { text: "Time", value: "parsedStartTime", width: 80 },
        { text: "Chương trình", value: "programName" }
      ]
    };
  },
  props: {
    channelName: {
      required: true,
      type: String | null
    },
    scheduleList: {
      required: true,
      type: Array
    },
    formattedDate: {
      required: true,
      type: String
    },
    loading:{
      required: false,
      type: Boolean
    }
  }
};
</script>