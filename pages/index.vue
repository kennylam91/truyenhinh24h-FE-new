<template>
  <v-container>
    <ProgramList
      class="mb-2"
      v-if="broadCastingPrograms"
      :title="'Đang chiếu'"
      :data="broadCastingPrograms"
    />
    <ProgramList
      class="mb-2"
      v-if="todayNoonPrograms"
      :title="'Nổi bật trưa nay'"
      :data="todayNoonPrograms"
    />
    <ProgramList
      class="mb-2"
      v-if="tonightPrograms"
      :title="'Nổi bật tối nay'"
      :data="tonightPrograms"
    />
    <ProgramList
      class="mb-2"
      v-if="nextDayPrograms"
      :title="'Nổi bật ngày mai'"
      :data="nextDayPrograms.slice(0,9)"
      :categoryShow="false"
      :rateShow="false"
    />
    <v-card class="mx-2" v-for="networkArr in networkMatrix" :key="networkArr[0]">
      <v-card-title class="orange--text"> {{networkArr[0]}} </v-card-title>
      <v-row class="mx-1">
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="(channel, index) in networkArr[1]"
          :key="index"
        >
          <v-card>
            <v-img
              :src="channel.logo"
              class="pointer"
              @click="viewChannelDetail(channel)"
            >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ProgramList from "@/components/ProgramList";
import { mapGetters } from "vuex";
export default {
  components: {
    ProgramList,
  },
  data() {
    return {
      broadCastingPrograms: null,
      todayNoonPrograms: null,
      tonightPrograms: null,
      nextDayPrograms: null,
      baseQuery: null,
      now: +new Date(),
      networkMatrix: new Map()
    };
  },
  computed: {
    ...mapGetters({
      channelList: "channelList",
      vipChannelList: "vipChannelList",
    }),
  },
  mounted() {
    this.baseQuery = {
      limit: 12,
      page: 1,
      sortBy: "rank",
      sortDirection: "DESC",
    };
    this.fetchBroadCastingPrograms();
    this.fetchTodayNoonPrograms();
    this.fetchTonightPrograms();
    this.fetchNextDayPrograms();
    this.networkMatrix = this.getNetworkMap()
  },
  methods: {
    fetchBroadCastingPrograms() {
      this.$store
        .dispatch("app/fetchTodayPrograms", {
          isBroadCasting: true,
          ...this.baseQuery,
        })
        .then((res) => {
          this.broadCastingPrograms = res;
        });
    },
    fetchTodayNoonPrograms() {
      const time11h = new Date().setHours(11, 0, 0, 0);
      const time13h = new Date().setHours(13, 0, 0, 0);
      if (this.now < time11h) {
        this.$store
          .dispatch("app/fetchTodayPrograms", {
            startTimeFrom: this.now < time11h ? time11h : this.now,
            startTimeTo: time13h,
            ...this.baseQuery,
          })
          .then((res) => {
            this.todayNoonPrograms = res;
          });
      }
    },
    fetchTonightPrograms() {
      const time19h = new Date().setHours(19, 0, 0, 0);
      const time22h = new Date().setHours(22, 0, 0, 0);
      const time24h = new Date().setHours(24, 0, 0, 0);
      if (this.now < time22h) {
        this.$store
          .dispatch("app/fetchTodayPrograms", {
            startTimeFrom: this.now < time19h ? time19h : this.now,
            startTimeTo: time24h,
            ...this.baseQuery,
          })
          .then((res) => {
            this.tonightPrograms = res;
          });
      }
    },
    fetchNextDayPrograms() {
      const time24h = new Date().setHours(24, 0, 0, 0);
      const startNextDay = time24h;
      const endNextDay = time24h + 24 * 60 * 60 * 1000;
      this.$store
        .dispatch("app/fetchTomorrowPrograms", {
          ...this.baseQuery,
          startTimeFrom: startNextDay,
          startTimeTo: endNextDay,
        })
        .then((res) => {
          this.nextDayPrograms = res;
        });
    },
    getNetworkMap(){
    const networks = this.channelList.map(c => c.networkName).filter(i => i != null)
    const networkSet = new Set(networks)
    const networkMatrix = []
    networkSet.forEach(network => {
      const channels = this.channelList.filter(c => c.networkName === network)
      networkMatrix.push([network, channels])
    })
    return networkMatrix
  }
  },
  
};
</script>
