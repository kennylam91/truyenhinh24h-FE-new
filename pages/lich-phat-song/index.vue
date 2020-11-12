<template>
  <div>
    <v-card>
      <v-card-title class="text--center">
        Lịch phát sóng
      </v-card-title>
      <v-card-text>
        <v-row class="px-4">
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              v-model="channelId"
              :items="channelSearchResult"
              :search-input.sync="search"
              :autofocus="true"
              hide-details
              hide-selected
              label="Chọn kênh"
              solo-inverted
              no-filter
              item-text="name"
              item-value="id"
              @blur="channelSearchResult = []"
              @change="onSearchChange"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Không tìm thấy dữ liệu!
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:item="{ item }">
                <v-img :src="item.logo" class="search-result-img"> </v-img>
                <v-list-item-content>
                  <span class="text-caption">{{ item.name }}</span>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="7" sm="6" md="4">
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
          <v-col cols="5" sm="6" md="4">
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
      </v-card-text>
      <schedule-table
        :channelName="search"
        :scheduleList="scheduleList"
        :formattedDate="computedDateFormatted"
        :loading="tableLoading"
      />
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ScheduleMixin from "./schedule-mixin";
import ScheduleTable from "./ScheduleTable";
export default {
  components: { ScheduleTable },
  mixins: [ScheduleMixin],
  data() {
    return {
      search: "",
      channelSearchResult: []
    };
  },
  computed: {
    ...mapGetters({})
  },
  watch: {
    search(val) {
      if (!val) {
        this.channelSearchResult = this.channelList;
      }
      const lowerCaseSearchText = (val && val.trim().toLowerCase()) || "";
      this.channelSearchResult = this.channelList.filter(channel => {
        return channel.name.toLowerCase().includes(lowerCaseSearchText);
      });
    }
  },
  created() {
    this.search = this.channelList[0].name;
    this.channelId = this.channelList[0].id;
    this.getScheduleList();
  },
  mounted() {
    this.channelSearchResult = this.channelList;
  },
  methods: {
    onSearchChange() {
      this.getScheduleList();
    }
  }
};
</script>