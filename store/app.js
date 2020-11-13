import request from '@/assets/js/request'
export const state = () => ({
  channelList: null,
  todayNoonProgramList: null,
  toNightProgramList: null,
  broadCastingProgramList: null,
  todayProgramList: null,
  nextDaysProgramList: null
});

export const mutations = {
  SET_CHANNEL_LIST: (state, value) => {
    state.channelList = value;
  },
  SET_TODAY_NOON_PROGRAM_LIST: (state, value) => {
    state.todayNoonProgramList = value;
  },
  SET_TONIGHT_PROGRAM_LIST: (state, value) => {
    state.toNightProgramList = value;
  },
  SET_BROAD_CASTING_PROGRAM_LIST: (state, value) => {
    state.broadCastingProgramList = value;
  },
  SET_TODAY_PROGRAM_LIST: (state, value) => {
    state.todayProgramList = value;
  },
  SET_NEXT_DAYS_PROGRAM_LIST: (state, value) => {
    state.nextDaysProgramList = value;
  }
};

export const actions = {
  setChannelList({ commit }, value) {
    commit("SET_CHANNEL_LIST", value);
  },
  setTodayNoonProgramList({ commit }, value) {
    commit("SET_TODAY_NOON_PROGRAM_LIST", value);
  },
  setTonightProgramList({ commit }, value) {
    commit("SET_TONIGHT_PROGRAM_LIST", value);
  },
  setBroadCastingProgramList({ commit }, value) {
    commit("SET_BROAD_CASTING_PROGRAM_LIST", value);
  },
  setTodayProgramList({ commit }, value) {
    commit("SET_TODAY_PROGRAM_LIST", value);
  },
  setNextDaysProgramList({ commit }, value) {
    commit("SET_NEXT_DAYS_PROGRAM_LIST", value);
  },
  fetchChannelList({ commit }) {
    return new Promise((resolve, reject) => {
      request({
        url: "/channels/get-all",
        method: "post",
        data: { page: 1, limit: 999999 }
      }).then(res => {
        commit("SET_CHANNEL_LIST", res);
        resolve(res);
      });
    });
  },
  fetchTodayPrograms({ commit }, data) {
    return request({
      url: "/programs/today",
      method: "post",
      data
    });
  },
  fetchTomorrowPrograms({ commit }, data) {
    return request({
      url: '/programs/tomorrow',
      method: 'post',
      data
    })
  },
  // request={channelId: }
  fetchChannel({ commit }, channelId) {
    return request({
      url: '/channels/' + channelId,
      method: 'get'
    })
  },
  // request: {channelId, programId, startTime, endTime, orderBy:[field, order], limit}
  searchSchedules({ state, dispatch }, data) {
    return request({
      url: '/schedules/search',
      method: 'post',
      data: data
    })
  },
  // request = {searchName, categoryCodes, ranks, isBroadCasting, getStartTimeFrom, getStartTimeTo,
  // page, limit, sortBy, sortDirection(DESC, ASC)}
  searchProgram({ commit }, data) {
    const formattedData = { ...data, searchName: (data.searchName || '' + '').toUpperCase() }
    return request({
      url: '/programs/search',
      method: 'post',
      data: formattedData
    })
  },
  // request = {programId}
  fetchProgram({ commit }, programId) {
    return request({
      url: '/programs/' + programId,
      method: 'get'
    })
  },
};
