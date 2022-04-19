<template>
  <div>
    <ActivityUpdate v-if="isUpdate" :activity="activity" :categories="categories" @updateActive="changeUpdate"/>
    <ActivityDetail v-else :activity="activity" :categories="categories" @updateActive="changeUpdate" />
  </div>
</template>

<script>
import ActivityDetail from "./ActivityDetail.vue";
import ActivityUpdate from "./ActivityUpdate.vue";
export default {
  components: {
    ActivityDetail,
    ActivityUpdate,
  },
  props: {
    activity: {
      required: true,
      type: Object,
    },
    categories: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isUpdate: false,
    };
  },
  methods: {
    changeUpdate (update) {
      this.isUpdate = update
    }
  }
};
</script>

<style scoped>
</style>
