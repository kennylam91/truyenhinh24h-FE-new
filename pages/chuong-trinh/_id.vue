<template>
  <v-row>
    <v-col>
      <v-card v-if="program">
        <v-row class="px-4">
          <v-col cols="12" sm="6" md="4">
            <v-img :src="program.logo" />
          </v-col>
          <v-col cols="12" sm="6" md="8" class="py-0 px-0">
            <v-card-title class="orange--text">
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
              />
              <v-sheet v-if="program.categories" class="mb-2">
                <v-chip
                  v-for="cat in program.categories"
                  :key="cat.id"
                  :small="false"
                  class="mr-1 mb-1"
                  label
                >
                  {{ cat.name }}
                </v-chip>
              </v-sheet>
            </v-card-text>
          </v-col>
        </v-row>

        <v-divider class="mx-4 my-4" />
        <ProgramScheduleTable
          :program-name="program.name"
          :schedule-list="scheduleList"
        />
        <v-divider class="mx-4 my-4" />
        <div class="row mx-4">
          <div class="embed-responsive embed-responsive-16by9">
            <span v-html="program.trailer" />
          </div>
        </div>
        <v-divider class="mx-4 mt-4" />
        <v-card-text>
          {{ program.description }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import ProgramScheduleTable from './ProgramScheduleTable'
export default {
  components: { ProgramScheduleTable },
  data() {
    return {
      program: null,
      programId: null,
      isDescShow: false,
      scheduleList: []
    }
  },
  computed: {},
  mounted() {
    const now = new Date()
    debugger
    this.programId = this.$route.params.id
      .split('_')
      .pop()
      .trim()
    this.$store.dispatch('app/fetchProgram', this.programId).then(program => {
      this.program = program
    })
    const data = { startTime: now, programId: this.programId }
    this.$store.dispatch('app/searchSchedules', data).then(res => {
      this.scheduleList = res.content
    })
  }
}
</script>
