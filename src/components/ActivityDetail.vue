<template>
  <article class="nosts">
    <div class="activity-title-wrapper">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i
        class="fas fa-cog activity-settings"
        @click="menuDisplayed = !menuDisplayed"
      />
    </div>
    <p>{{ textUtility_capitilize(activity.category) }}</p>
    <p>{{ activity.notes }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.jpeg" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Milos Jeremic</a> updated
            {{ activity.updatedAt | firstTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span
          >Progress
          <span :class="'color-' + activityProgress"
            >{{ activity.progress }} %</span
          >
        </span>
        <!-- <span>Progress <span :style="{'color': activityProgress}">{{activity.progress}} %</span> </span> -->
      </div>
    </div>
    <div v-if="menuDisplayed" class="activity-controll">
      <a class="button is-warning" @click="$emit('updateActive', true)">Edit</a>
      <a class="button is-danger" @click="deleteTask" >Delete</a>
    </div>
  </article>
</template>

<script>
import utilityText from "@/mixins/utilityText";
import store from '@/store'
export default {
  data () {
    return {
      menuDisplayed: false
    }
  },
  props: {
    categories: {
      type: Object,
      required: true,
    },
    activity: {
      type: Object,
      required: true,
    },
  },
  mixins: [utilityText],
  computed: {
    activityProgress() {
      const progress = this.activity.progress;

      if (progress <= 0) {
        return "red";
      } else if (progress <= 50) {
        return "orange";
      } else {
        return "green";
      }
    },
  },
  methods: {
    deleteTask () {
        store.deleteTask(this.activity);
      }

  }
};
</script>

<style lang="scss">
.color-red {
  color: red;
}
.color-orange {
  color: orange;
}
.color-green {
  color: greenyellow;
}
.activity-title {
  margin-bottom: 5px;
  display: inline-block;
}
.activity-settings {
  float: right;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
}
.activity-controll {
  margin: 20px 0 0 0;
  a {
    margin-right: 5px;
  }
}
.nosts .title {
  margin-bottom: 5px;
}
</style>
