<template>
  <div class="CreateForm">
    <a
      v-if="!isForm"
      @click="formDisplay"
      class="button is-primary is-block is-alt is-large"
      href="#"
      >Add Task</a
    >
    <div v-if="isForm" class="create-form">
      <h2>Create Tasks</h2>
      <form>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              v-model="newActivity.title"
              class="input"
              type="text"
              placeholder="Task Name"
            />
          </div>
          <div class="field">
            <label class="label">Notes</label>
            <div class="control">
              <textarea
                v-model="newActivity.notes"
                class="textarea"
                placeholder="Write"
              ></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <select v-model="newActivity.category" class="select">
                <option disable value="">Select One</option>
                <option v-for="category in categories" :key="category.id">
                  {{ category.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              @click.prevent="createActivity"
              class="button is-link"
              :disabled="!formValid"
            >
              Create Task
            </button>
          </div>
          <div class="control">
            <button class="button is-text" @click="formDisplay">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  props: {
    categories: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isForm: false,
      newActivity: {
        title: "",
        notes: "",
        category: "",
      },
    };
  },
  computed: {
    formValid() {
      return (
        this.newActivity.title &&
        this.newActivity.notes &&
        this.newActivity.category
      );
    },
  },
  methods: {
    formDisplay() {
      this.isForm = !this.isForm;
    },
    resetActivity() {
      this.newActivity.title = "";
      this.newActivity.notes = "";
      this.newActivity.category = "";
    },
    createActivity() {
      store.createActivity({...this.newActivity})
        .then(activity => {
          this.resetActivity(activity)
          this.isForm = false
        })
    },
  },
};
</script>

<style>
</style>