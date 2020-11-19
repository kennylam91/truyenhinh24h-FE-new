<template>
  <div>
    <v-card class="mx-2">
      <v-card-title class="orange--text">
        {{ title }}
      </v-card-title>
      <client-only>
        <v-row class="mx-4 d-block d-sm-none">
          <v-carousel
            :continuous="true"
            :cycle="true"
            hide-delimiters
            hide-delimiter-background
            height="auto"
          >
            <v-carousel-item v-for="program in data" :key="program.id">
              <Program :program="program" :category-show="categoryShow" />
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <v-row class="mx-1 d-none d-sm-flex">
          <v-col
            v-for="(program, index) in data"
            :key="index"
            class="d-xs-none d-sm-block"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <Program
              class="d-xs-none d-sm-block"
              :program="program"
              :category-show="categoryShow"
              :rate-show="rateShow"
            />
          </v-col>
        </v-row>
      </client-only>
    </v-card>
  </div>
</template>
<script>
import Program from '@/components/Program'
export default {
  components: {
    Program
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    categoryShow: {
      type: Boolean,
      required: false,
      default: () => true
    },
    rateShow: {
      type: Boolean,
      required: false,
      default: () => true
    }
  },
  data() {
    return {}
  }
}
</script>
