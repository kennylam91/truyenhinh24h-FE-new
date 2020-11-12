<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-row class="px-4">
            <v-col cols="12" sm="6" md="4">
              <v-img :src="channel.logo"> </v-img>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-card-title class="purple--text pt-0 px-0">
                Kênh {{ channel.name }}
              </v-card-title>
              <v-card-text class="py-0 px-0">
                {{ channel.description }}
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider class="mx-4 mt-3"></v-divider>
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
          <schedule-table
            :channelName="channel.name"
            :scheduleList="scheduleList"
            :formattedDate="computedDateFormatted"
            :loading="tableLoading"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ScheduleMixin from "./schedule-mixin";
import ScheduleTable from "./ScheduleTable";
export default {
  asyncData({ params, store }) {
    const channelId = params.id.split("_").pop();
    return store.dispatch("app/fetchChannel", channelId).then(channel => {
      return { channel, channelId };
    });
  },
  components: { ScheduleTable },
  mixins: [ScheduleMixin],
  data() {
    return {
      channel: null
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getScheduleList(new Date());
  },
  methods: {}
};
</script>