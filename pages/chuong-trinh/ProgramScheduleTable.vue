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
          :small="true"
          class="d-sm-none d-inline-block"
          @click="
            viewChannelDetail({ name: item.channelName, id: item.channelId })
          "
        >
          <v-icon class="mr-1" :small="true">
            mdi-television-play
          </v-icon>
          {{ item.channelName }}
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
          {{ item.channelName }}
        </v-chip>
      </template>
      <template v-slot:item.startTime="{ item }">
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
    </v-data-table>
  </div>
</template>
<script>
export default {
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
        { text: 'Thời gian', value: 'startTime', align: 'center' }
      ]
    }
  }
}
</script>
