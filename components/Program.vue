<template>
  <v-sheet>
    <v-card class="mx-auto">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-sheet>
        <v-img
          :src="program.logo"
          class="white--text align-end pointer"
          @click="viewProgramDetail(program)"
        >
          <div  class="white--text px-2 subtitle-2">{{ program.enName }}</div>
        </v-img>
      </v-sheet>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-card-title v-bind="attrs" v-on="on" class="truncate d-block" style="font-size: 1.125rem;">
            {{ program.name }}</v-card-title
          >
        </template>
        <span>{{ program.name }}</span>
      </v-tooltip>

      <v-card-text class="">
        <v-row align="center" class="mx-0 mt-0">
          <v-rating
            :value="program.rank"
            color="amber"
            dense
            half-increments
            readonly
            size="16"
          ></v-rating>
        </v-row>
        <v-row class="mx-0 mt-2">
          <v-chip class="mr-1" color="purple" small="true" >
            <v-icon class="mr-1" small="true">
              mdi-television-play
            </v-icon>
            <router-link class="white--text" :to="'/kenh'">
              {{ program.schedules[0].channelName }}
            </router-link>
          </v-chip>
          <v-chip color="indigo" small="true">
            <v-icon class="mr-1" small="true">
              mdi-clock-time-three-outline
            </v-icon>
            <span>{{ startTimeParsed }}</span>
          </v-chip>
        </v-row>
        <v-sheet class="mt-2">
          <v-chip
            v-for="cat in program.categories.filter(i => i.code != 1)"
            :key="cat.id"
            small="true"
            class="mr-1 mb-1"
            label
          >
            {{ cat.name }}
          </v-chip>
        </v-sheet>
        
        <v-row class="mt-2 mx-0">
          
        </v-row>
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
