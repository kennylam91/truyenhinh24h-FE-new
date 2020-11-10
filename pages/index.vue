<template>
  <v-container>
    <v-card class="mx-2">
      <v-card-title class="orange--text">
        Chương trình đang chiếu
      </v-card-title>
      <v-row class="mx-1">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(program, index) in schedulingPrograms"
          :key="index"
        >
          <Program :program="program" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Program from "../components/Program";
export default {
  components: {
    Program
  },
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      selection: 1,
      schedulingPrograms: [
        {
          id: 677,
          name: "CUỘC ĐUA LỊCH SỬ",
          enName: "FORD V. FERRARI",
          description:
            "Khán giả sẽ có dịp tái ngộ hai tài tử Christian Bale và Matt Damon trong dự án mới nhất của đạo diễn James Mangold. Phim lấy bối cảnh đường đua Le Mans 1966 xoay quanh cuộc cạnh tranh gắt gao giữa hai hãng xe hàng đầu thế giới là Ford và Ferrari. Trước sự thống trị của Ferrari, hãng Ford quyết định chiêu mộ nhóm kỹ sư do huyền thoại Carroll Shelby (Matt Damon) đứng đầu, cùng tay đua kiệt xuất Ken Miles (Christian Bale) để chế tạo ra một mẫu xe đua mang tính cách mạng nhằm đánh bại đối thủ Ferrari.",
          categoryCodes: [1, 36, 15],
          logo:
            "https://image.tmdb.org/t/p/w400/ydmZIafp66mHABs3QJDwvjRgZfE.jpg",
          rank: 5,
          year: 2019,
          categories: [
            { id: 1, name: "Phim", code: 1 },
            { id: 15, name: "Lịch Sử", code: 15 },
            { id: 36, name: "Chính kịch", code: 36 }
          ],
          trailer:
            '<iframe width="1280" height="720" src="https://www.youtube.com/embed/zyYgDtY2AMY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          schedules: [
            {
              id: 12364,
              channelId: 2,
              programId: 677,
              startTime: "2020-11-10T01:15:00.000+00:00",
              endTime: "2020-11-10T03:50:00.000+00:00",
              programName: "CUỘC ĐUA LỊCH SỬ",
              channelName: "FOX MOVIES"
            }
          ]
        },
        {
          id: 672,
          name: "HARRY POTTER VÀ CHIẾC CỐC LỬA (4)",
          enName: "HARRY POTTER AND THE GOBLET OF FIRE",
          description:
            "Khi giải Quidditch Thế giới bị cắt ngang bởi những kẻ ủng hộ Chúa tể Voldemort và sự trở lại của Dấu hiệu hắc ám khủng khiếp, Harry ý thức được rõ ràng rằng, Chúa tể Voldemort đang ngày càng mạnh hơn. Và để trở lại thế giới phép thuật, Chúa tể hắc ám cần phải đánh bại kẻ duy nhất sống sót từ lời nguyền chết chóc của hắn - Harry Potter. Vì lẽ đó, khi Harry bị buộc phải bước vào giải đấu Tam Pháp thuật uy tín nhưng nguy hiểm, cậu nhận ra rằng trên cả chiến thắng, cậu phải giữ được mạng sống của mình.",
          categoryCodes: [1, 17, 37, 31],
          logo:
            "https://image.tmdb.org/t/p/w400/a5ARIgJrqDnxjyYRJaH7x9RrpKi.jpg",
          rank: 4,
          year: 2005,
          categories: [
            { id: 1, name: "Phim", code: 1 },
            { id: 31, name: "Gia đình", code: 31 },
            { id: 17, name: "Phiên lưu", code: 17 },
            { id: 37, name: "Gây cấn", code: 37 }
          ],
          trailer:
            '<iframe width="1280" height="720" src="https://www.youtube.com/embed/3EGojp4Hh6I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          schedules: [
            {
              id: 12320,
              channelId: 1,
              programId: 672,
              startTime: "2020-11-10T01:25:00.000+00:00",
              endTime: "2020-11-10T04:00:00.000+00:00",
              programName:
                "HARRY POTTER VÀ CHIẾC CỐC LỬA (4) - HARRY POTTER AND THE GOBLET OF FIRE",
              channelName: "HBO"
            }
          ]
        }
      ]
    };
  },
  methods: {
    reserve() {
      setTimeout(() => (this.loading = false), 2000);
    }
  }
};
</script>
