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
      <template v-slot:[`item.parsedStartTime`]="{ item }">
        {{ item.parsedStartTime }}
      </template>
      <template v-slot:[`item.programName`]="{ item }">
        <div
          v-if="item.programId"
          class="pointer text--underline"
          @click="viewProgramDetail({id: item.programId, name: item.programName})"
        >
          {{ item.programName }}
        </div>
        <div v-else>
          {{ item.programName }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
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
        { text: 'Chương trình', value: 'programName' }
      ]
    }
  }
}
</script>
