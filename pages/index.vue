<template>
  <v-container>
    <ProgramList
      v-if="broadCastingProgramList && broadCastingProgramList.length > 0"
      class="mb-2"
      :title="'Đang chiếu'"
      :data="broadCastingProgramList"
    />
    <ProgramList
      v-if="todayNoonProgramList && todayNoonProgramList.length > 0"
      class="mb-2"
      :title="'Nổi bật trưa nay'"
      :data="todayNoonProgramList"
    />
    <ProgramList
      v-if="toNightProgramList && toNightProgramList.length > 0"
      class="mb-2"
      :title="'Nổi bật tối nay'"
      :data="toNightProgramList"
    />
    <keep-alive>
      <ProgramList
        v-if="nextDaysProgramList && nextDaysProgramList.length > 0"
        class="mb-2"
        :title="'Nổi bật ngày mai'"
        :data="nextDaysProgramList.slice(0, 9)"
        :category-show="false"
        :rate-show="false"
      />
    </keep-alive>
    <v-card
      v-for="categoryArr in categoryMatrix"
      :key="categoryArr[0]"
      class="mx-2"
    >
      <v-card-title class="orange--text"> {{ categoryArr[0] }} </v-card-title>
      <v-row class="mx-1">
        <v-col
          v-for="(channel, index) in categoryArr[1]"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-card>
            <v-img
              :src="channel.logo"
              class="pointer"
              :alt="'Lịch phát sóng kênh ' + channel.name"
              @click="viewChannelDetail(channel)"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ProgramList from '@/components/ProgramList'
import { mapGetters } from 'vuex'
export default {
  components: {
    ProgramList
  },
  asyncData({ params, store }) {
    const categories = store.state.app.channelList
      .map(c => c.category)
      .filter(i => i != null)
    const categorySet = new Set(categories)
    const categoryMatrix = []
    categorySet.forEach(cat => {
      const channels = store.state.app.channelList.filter(
        c => c.category === cat
      )
      categoryMatrix.push([cat, channels])
    })
    return { categoryMatrix }
  },
  data() {
    return {
      broadCastingPrograms: null,
      baseQuery: null,
      now: +new Date()
      // categoryMatrix: new Map()
    }
  },
  computed: {
    ...mapGetters({
      channelList: 'channelList',
      vipChannelList: 'vipChannelList',
      nextDaysProgramList: 'nextDaysProgramList',
      toNightProgramList: 'toNightProgramList',
      todayNoonProgramList: 'todayNoonProgramList',
      broadCastingProgramList: 'broadCastingProgramList'
    })
  },
  mounted() {
    this.baseQuery = {
      limit: 12,
      page: 1,
      sortBy: 'rank',
      sortDirection: 'DESC'
    }
    this.fetchBroadCastingPrograms()
    this.fetchTodayNoonPrograms()
    this.fetchTonightPrograms()
    this.fetchNextDayPrograms()
    // this.categoryMatrix = this.getCategoryMap()
  },
  methods: {
    fetchBroadCastingPrograms() {
      if (!this.broadCastingProgramList) {
        this.$store.dispatch('app/fetchTodayPrograms', {
          isBroadCasting: true,
          ...this.baseQuery
        }).then(res => {
          this.$store.dispatch('app/setBroadCastingProgramList', res)
        })
      }
    },
    fetchTodayNoonPrograms() {
      if (!this.todayNoonProgramList) {
        const time11h = new Date().setHours(11, 0, 0, 0)
        const time13h = new Date().setHours(13, 0, 0, 0)
        if (this.now < time11h) {
          this.$store.dispatch('app/fetchTodayPrograms', {
            startTimeFrom: this.now < time11h ? time11h : this.now,
            startTimeTo: time13h,
            ...this.baseQuery
          }).then(res => {
            this.$store.dispatch('app/setTodayNoonProgramList', res)
          })
        }
      }
    },
    fetchTonightPrograms() {
      if (!this.toNightProgramList) {
        const time19h = new Date().setHours(19, 0, 0, 0)
        const time22h = new Date().setHours(22, 0, 0, 0)
        const time24h = new Date().setHours(24, 0, 0, 0)
        if (this.now < time22h) {
          this.$store.dispatch('app/fetchTodayPrograms', {
            startTimeFrom: this.now < time19h ? time19h : this.now,
            startTimeTo: time24h,
            ...this.baseQuery
          }).then(res => {
            this.$store.dispatch('app/setTonightProgramList', res)
          })
        }
      }
    },
    fetchNextDayPrograms() {
      if (!this.nextDaysProgramList) {
        const time24h = new Date().setHours(24, 0, 0, 0)
        const startNextDay = time24h
        const endNextDay = time24h + 24 * 60 * 60 * 1000
        this.$store.dispatch('app/fetchTomorrowPrograms', {
          ...this.baseQuery,
          startTimeFrom: startNextDay,
          startTimeTo: endNextDay
        }).then(res => {
          this.$store.dispatch('app/setNextDaysProgramList', res)
        })
      }
    },
    getCategoryMap() {
      const categories = this.channelList
        .map(c => c.category)
        .filter(i => i != null)
      const categorySet = new Set(categories)
      const categoryMatrix = []
      categorySet.forEach(cat => {
        const channels = this.channelList.filter(
          c => c.category === cat
        )
        categoryMatrix.push([cat, channels])
      })
      return categoryMatrix
    }
  }
}
</script>
