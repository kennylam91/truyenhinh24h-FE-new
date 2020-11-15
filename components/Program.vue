<template>
  <v-sheet>
    <v-card class="mx-auto" outlined>
      <v-sheet>
        <v-img
          :src="program.logo || defaultImg"
          class="white--text align-end pointer"
          @click="viewProgramDetail(program)"
        >
          <div class="orange--text px-2 subtitle-2">{{ program.enName }}</div>
        </v-img>
      </v-sheet>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-card-title
            v-bind="attrs"
            class="truncate d-block"
            style="font-size: 1.125rem;"
            v-on="on"
          >
            {{ program.name }}</v-card-title>
        </template>
        <span>{{ program.name }}</span>
      </v-tooltip>

      <v-card-text class="">
        <v-row v-if="rateShow" align="center" class="mx-0 mb-2">
          <v-rating
            :value="program.rank"
            color="amber"
            dense
            half-increments
            readonly
            size="16"
          />
        </v-row>
        <v-row class="mx-0 mb-2">
          <v-chip class="mr-1" color="purple" :small="true">
            <v-icon class="mr-1" :small="true">
              mdi-television-play
            </v-icon>
            <span class="white--text text--underline pointer" @click="goToChannelDetail()">
              {{ program.schedules[0].channelName }}
            </span>
          </v-chip>
          <v-chip color="indigo" :small="true">
            <v-icon class="mr-1" :small="true">
              mdi-clock-time-three-outline
            </v-icon>
            <span>{{ startTimeParsed }}</span>
          </v-chip>
        </v-row>
        <v-sheet v-if="categoryShow" class="mb-2">
          <v-chip
            v-for="cat in program.categories.filter(i => i.code != 1).slice(0,2)"
            :key="cat.id"
            :small="true"
            class="mr-1 mb-1"
            label
          >
            {{ cat.name }}
          </v-chip>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script>
export default {
  name: 'Program',
  props: {
    program: {
      required: true,
      type: Object
    },
    categoryShow: {
      type: Boolean,
      required: false,
      default: () => true
    },
    rateShow: {
      type: Boolean,
      required: false,
      default: () => true
    }
  },
  data() {
    return {
      defaultImg: require('@/assets/images/default-program-picture.png')
    }
  },
  computed: {
    startTimeParsed() {
      return this.parseTime(
        new Date(this.program.schedules[0].startTime),
        '{H}:{i}'
      )
    },
    endTimeParsed() {
      return this.parseTime(
        new Date(this.program.schedules[0].endTime),
        '{H}:{i}'
      )
    }

  },
  methods: {
    goToChannelDetail() {
      const schedule = this.program.schedules[0]
      const channel = { id: schedule.channelId, name: schedule.channelName }
      this.viewChannelDetail(channel)
    }
  }
}
</script>
