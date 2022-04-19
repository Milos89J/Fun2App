<template>
  <article class="nosts">
    <div class="activity-title">
      <i
        class="fas fa-cog activity-settings"
        @click="menuDisplayed = !menuDisplayed"
      />
      <input v-model="modifiedActivity.title" type="text" class="input" />
    </div>
    <div class="activity-category">
      <select v-model="modifiedActivity.category" class="select">
        <option disabled value="">Select one</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.text }}
        </option>
      </select>
    </div>
    <div class="control activity-notes">
      <textarea
        v-model="modifiedActivity.notes"
        class="textarea"
        placeholder="Write some notes here"
      />
    </div>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.jpeg" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">User</a> Updated
            {{ modifiedActivity.updatedAt | firstTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <input
          id="progress"
          v-model.number="modifiedActivity.progress"
          type="range"
          name="progress"
          min="0"
          max="100"
          value="90"
          step="10"
        />
        <label for="progress">{{ modifiedActivity.progress }} %</label>
      </div>
    </div>
    <div v-if="menuDisplayed" class="activity-controll">
      <a class="button is-warning" @click="updateActivity()">Update</a>
      <a class="button is-danger" @click="$emit('updateActive', false)"
        >Cancel</a
      >
    </div>
  </article>
</template>

<script>
import store from "@/store"
import utilityText from "@/mixins/utilityText";
export default {
  mixins: [utilityText],
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
  data() {
    return {
      menuDisplayed: true,
      modifiedActivity: {...this.activity}
    };
  },
  methods: {
    updateActivity() {
       store.updateActivity(this.modifiedActivity)
       .then(() => {
         this.$emit('updateActive', false)
       })
    },
  },
};
</script>

<style scoped lang="scss">
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
  margin-bottom: 10px;
  > i {
    margin-bottom: 14px;
  }
}
.activity-category {
  margin-bottom: 10px;
}
.activity-notes {
  margin-bottom: 10px;
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