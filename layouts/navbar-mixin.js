import { mapGetters } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      isShowSearch: false,
      title: "Truyenhinh24h",
      model: "",
      searchAllResults: [],
      search: null,
      timerId: null,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      channelList: "channelList",
    })
  },
  watch: {
    search(val) {

      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      const lowerCaseSearchText = (val && val.trim().toLowerCase()) || "";
      if (lowerCaseSearchText.length < 2) {
      } else {
        this.timerId = setTimeout(() => {
          this.isLoading = true;
          this.searchAllResults = [];
          const channelSearchResult = this.channelList.filter(channel => {
            return channel.name.toLowerCase().includes(lowerCaseSearchText);
          });

          this.searchAllResults = this.searchAllResults.concat(
            channelSearchResult
          );
          this.$store
            .dispatch("app/searchProgram", {
              searchName: val,
              page: 1,
              limit: 8
            })
            .then(res => {
              this.searchAllResults = this.searchAllResults.concat(res.content);
            })
            .finally(() => {
              this.isLoading = false;
            });
          this.visible = true;
        }, 500);
      }
    }
  },
  methods: {
    onSearchChange(value) {
      this.isShowSearch = false;
      const selectedItem = this.searchAllResults.find(
        item => item.id === value
      );
      if (selectedItem) {
        if (selectedItem.rank) {
          this.viewProgramDetail(selectedItem);
        } else {
          this.viewChannelDetail(selectedItem);
        }
      }
    },
    onNavbarIconClick(){
      this.$emit('navbar-icon-click')
    }
  }
};
