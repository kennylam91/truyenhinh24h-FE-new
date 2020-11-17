export default {
  data() {
    return {
      addedSchedule: [],
      scheduleTableKey: 0,
      alert: false
    }
  },
  mounted() {
    this.addedSchedule = localStorage.addedSchedule.split(',')
  },
  methods: {
    isBroadCasting(schedule) {
      const now = new Date()
      return new Date(schedule.startTime) <= now && now <= new Date(schedule.endTime)
    },
    isShowBellRing(schedule) {
      const now = new Date()
      return new Date(schedule.startTime) >= now
    },
    isBellRingDisabled(schedule) {
      return this.addedSchedule.some(item => item + '' === schedule.id + '')
    },
    addScheduleToGGCal(schedule) {
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
      if (!isSignedIn) {
        gapi.auth2.getAuthInstance().signIn().then(() => {
        })
      } else {
        this.addEvent(schedule)
      }
    },
    addEvent(schedule) {
      const event = {
        'summary': schedule.channelName + '-' + schedule.programName,
        'start': {
          'dateTime': new Date(schedule.startTime),
          // 'dateTime': new Date(2020, 5, 7, 0, 0, 0, 0),
          'timeZone': 'Etc/GMT+7'
        },
        'end': {
          'dateTime': new Date(schedule.endTime),
          // 'dateTime': new Date(2020, 5, 8, 0, 0, 0, 0),
          'timeZone': 'Etc/GMT+7'
        },
        'reminders': {
          'useDefault': false,
          'overrides': [
            { 'method': 'popup', 'minutes': 10 }
          ]
        }
      }
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      })
      request.execute((event) => {
        this.alert = true
        localStorage.addedSchedule += ',' + schedule.id
        this.addedSchedule.push(schedule.id + '')
        this.scheduleTableKey++
      })
    }
  }
}
