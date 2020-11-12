import { mapGetters } from "vuex";
import { parseTime } from "@/assets/js/utils";

export default {
  data() {
    return {
      channelId: null,
      datePickerMenu: false,
      selectedDate: new Date().toISOString().substr(0, 10),
      dateObj: new Date(),
      quickDateSelect: 0,
      scheduleList: [],
      tableLoading: false
    };
  },
  computed: {
    ...mapGetters({
      channelList: "channelList",
    }),
    computedDateFormatted() {
      return this.formatDate(this.selectedDate);
    }
  },
  watch: {
    quickDateSelect(newValue) {
      let date = new Date();
      if (newValue === 0) {
        this.selectedDate = date.toISOString().substr(0, 10);
      } else if (newValue === 1) {
        const now = new Date();
        const tomorrow = now.setDate(now.getDate() + 1);
        date = new Date(tomorrow);
        this.selectedDate = date.toISOString().substr(0, 10);
      }
      this.dateObj = date
      this.getScheduleList();
    }
  },
  methods: {
    onDatePickerInput() {
      const now = new Date();
      this.datePickerMenu = false;
      const [year, month, day] = this.selectedDate.split("-");
      const date = new Date(year, month - 1, day, 0, 0, 0, 0);
      this.dateObj = date
      this.getScheduleList();
      if (
        Number(year) === now.getFullYear() &&
        month - 1 === now.getMonth() &&
        Number(day) === now.getDate()
      ) {
        this.quickDateSelect = 0;
      } else if (
        Number(year) === now.getFullYear() &&
        month - 1 === now.getMonth() &&
        Number(day) === now.getDate() + 1
      ) {
        this.quickDateSelect = 1;
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    getScheduleList() {
      this.tableLoading = true
      this.fetchScheduleList(this.channelId, this.dateObj).then((res) => {
        this.scheduleList = res.content;
        this.scheduleList.forEach(
          (schedule) =>
            (schedule.parsedStartTime = parseTime(
              new Date(schedule.startTime),
              "{H}:{i}"
            ))
        );
        this.tableLoading = false
      });
    },
  }
};
