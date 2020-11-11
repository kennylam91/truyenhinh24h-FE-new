<template>
  <v-sheet>
    <v-card class="mx-auto">
      <v-sheet>
        <v-img
          :src="program.logo"
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
            v-on="on"
            class="truncate d-block"
            style="font-size: 1.125rem;"
          >
            {{ program.name }}</v-card-title
          >
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
          ></v-rating>
        </v-row>
        <v-row class="mx-0 mb-2">
          <v-chip class="mr-1" color="purple" :small="true">
            <v-icon class="mr-1" :small="true">
              mdi-television-play
            </v-icon>
            <router-link class="white--text" :to="'/kenh'">
              {{ program.schedules[0].channelName }}
            </router-link>
          </v-chip>
          <v-chip color="indigo" :small="true">
            <v-icon class="mr-1" :small="true">
              mdi-clock-time-three-outline
            </v-icon>
            <span>{{ startTimeParsed }}</span>
          </v-chip>
        </v-row>
        <v-sheet class="mb-2" v-if="categoryShow">
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
  name: "Program",
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
  computed: {
    startTimeParsed() {
      return this.parseTime(
        new Date(this.program.schedules[0].startTime),
        "{H}:{i}"
      );
    },
    endTimeParsed() {
      return this.parseTime(
        new Date(this.program.schedules[0].endTime),
        "{H}:{i}"
      );
    }
  }
};
</script>
