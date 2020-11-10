<template>
  <div>
    <v-card class="mx-2">
      <v-card-title class="orange--text">
        {{title}}
      </v-card-title>
      <v-row class="mx-1">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(program, index) in data"
          :key="index"
        >
          <Program :program="program" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import Program from "@/components/Program";
export default {
  components: {
    Program
  },
  props:{
    title:{
      type: String,
      required: true
    },
    data:{
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
    };
  }
};
</script>
