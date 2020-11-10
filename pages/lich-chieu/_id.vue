<template>
  <div>
    <v-row>
      <v-col>
        Chi tiet channel
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  asyncData({ params, store }) {
    const channelId = params.id.split('_').pop()
    return store.dispatch('app/fetchChannel', channelId).then(channel => {
      return { channel, channelId }
    })
  },
  data() {
    return {
      channelId: null,
      channel: null,
    }
  },
}
</script>