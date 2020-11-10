const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  channelList: state => state.app.channelList,
  vipChannelList: state => (state.app.channelList &&
    state.app.channelList.filter(item => item.vip).slice(0, 18)) || [],
  todayNoonProgramList: state => state.app.todayNoonProgramList,
  toNightProgramList: state => state.app.toNightProgramList,
  broadCastingProgramList: state => state.app.broadCastingProgramList,
  todayProgramList: state => state.app.todayProgramList,
  nextDaysProgramList: state => state.app.nextDaysProgramList,
}
export default getters
