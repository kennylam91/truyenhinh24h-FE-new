<template>
  <div>
    <v-row>
      <v-col>
        <v-card v-if="program">
          <v-row class="px-4">
            <v-col cols="12" sm="6" md="4">
              <v-img :src="program.logo"> </v-img>
            </v-col>
            <v-col cols="12" sm="6" md="8" class="py-0 px-0">
              <v-card-title class="purple--text">
                {{ program.name }}
              </v-card-title>
              <v-card-subtitle class="pb-3">
                {{ program.enName }}
              </v-card-subtitle>
              <v-card-text class="">
                <v-rating
                  class="mb-2"
                  :value="program.rank"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="16"
                ></v-rating>
                <v-sheet class="mb-2">
                  <v-chip
                    v-for="cat in program.categories
                      .filter(i => i.code != 1)
                      .slice(0, 2)"
                    :key="cat.id"
                    :small="true"
                    class="mr-1 mb-1"
                    label
                  >
                    {{ cat.name }}
                  </v-chip>
                </v-sheet>
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider class="mx-4 mt-3"></v-divider>
          <!-- <v-row class="px-4">
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
          </v-row> -->
          <!-- <schedule-table
            :channelName="channel.name"
            :scheduleList="scheduleList"
            :formattedDate="computedDateFormatted"
            :loading="tableLoading"
          /> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      program: null,
      programId: null,
      isDescShow: false
    };
  },
  computed: {},
  mounted() {
    const now = new Date();
    this.programId = this.$route.params.id
      .split("_")
      .pop()
      .trim();
    this.$store.dispatch("app/fetchProgram", this.programId).then(program => {
      this.program = program;
    });
    const data = { startTime: now, programId: this.programId };
    this.$store.dispatch("app/searchSchedules", data).then(res => {
      this.scheduleList = res.content;
    });
  }
};
</script>