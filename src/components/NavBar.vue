<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <a
            :class="{ 'is-active': filterOption === 'all' }"
            @click="eFilter('all')"
            class="navbar-item"
            >All</a
          >
          <a
            :class="{ 'is-active': filterOption === 'inprogress' }"
            @click="eFilter('inprogress')"
            class="navbar-item"
            >In Progress</a
          >
          <a
            :class="{ 'is-active': filterOption === 'finished' }"
            @click="eFilter('finished')"
            class="navbar-item"
            >Finished</a
          >
          <a
            :class="{ 'is-active': filterOption === 'notstarted' }"
            @click="eFilter('notstarted')"
            class="navbar-item"
            >Not Started</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  data() {
    return {
      filterOption: "all",
    };
  },
  methods: {
    eFilter(filterOption) {
      this.filterOption = filterOption;
      this.$emit("filterSelected", filterOption);
    },
  },
};
</script>

<style>
</style>