<template>
  <div v-if="dataLoaded" id="vueApp">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ fullName }}</h1>
        </div>
      </div>
    </nav>
    <NavBar @filterSelected="setFilter" />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate :categories="categories" />
        </div>
        <div class="column is-9">
          <div
            class="box content"
            :class="{ fetching: isFetch, 'has-error': error }"
          >
            <div v-if="error">{{ error }}</div>
            <div v-else>
              <div v-if="isFetch">Loading...</div>
              <div v-if="dataLoaded">
                <ActivityItem
                  v-for="activity in filterActivities"
                  :activity="activity"
                  :key="activity.id"
                  :categories="categories"
                ></ActivityItem>
              </div>
            </div>
            <div v-if="isFetch">
              <div class="a-length">Currenly {{ aLength }} tasks</div>
              <div class="a-motivation">{{ aMotivation }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from "./store";
import ActivityItem from "@/components/ActivityItem";
import ActivityCreate from "@/components/ActivityCreate";
import NavBar from "@/components/NavBar";
//import { fetch, fetchUser, fetchCategories, deleteActivityAPI } from "@/api";
//import fakeApi from '@/lib/fakeApi'
export default {
  name: "app",
  components: { ActivityItem, ActivityCreate, NavBar },
  data() {
    const {
      state: { activities, categories },
    } = store;
    return {
      create: "M.Jeremic",
      appsName: "Planner",
      watchName: "Planner - M.Jeremic",
      isFetch: false,
      error: null,
      user: {},
      activities,
      categories,
      filter: "all",
    };
  },
  computed: {
    filterActivities() {
      let filterActivities = {};
      let condition = {};

      if (this.filter === "all") {
        return this.activities;
      }
      if (this.filter === "inprogress") {
        condition = (value) => value > 0 && value < 100;
      } else if (this.filter === "finished") {
        condition = (value) => value === 100;
      } else {
        condition = (value) => value === 0;
      }

      filterActivities = Object.values(this.activities).filter((activity) => {
        return condition(activity.progress);
      });

      return filterActivities;
    },

    fullName() {
      return this.appsName + " - " + this.create;
    },
    aLength() {
      return Object(this.activities).length;
    },
    aMotivation() {
      if (this.aLength && this.aLength < 5) {
        return "manje je od 5";
      } else if (this.aLength >= 5) {
        return "vece ili manje od pet";
      } else {
        return "nema aktivivnih taskova";
      }
    },
    lengthActivities() {
      return Object.keys(this.activities).length;
    },
    lengthCategories() {
      return Object.keys(this.categories).length;
    },
    dataLoaded() {
      return this.lengthActivities && this.lengthCategories;
    },
  },

  created() {
    //fakeApi.dB()
    this.isFetch = true;
    store
      .fetch()
      .then((activities) => {
        console.log(activities); //this is important options ---------
        this.isFetch = false;
      })
      .catch((err) => {
        this.error = err;
        this.isFetch = false;
      });
    this.user = store.fetchUser();
    store.fetchCategories().then((categories) => {
      this.categories = categories;
    });
  },
  methods: {
    setFilter(filterOption) {
      this.filter = filterOption;
    },
  },
};
</script>

<style>
#vueApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: purple;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #c5d5e6;
}
footer {
  background-color: #f2f6fa !important;
}
.fetching {
  border: 2px solid orange;
}
.has-error {
  border: 2px solid red;
}
.a-length {
  display: inline-block;
}
.a-motivation {
  float: right;
}
.example-wrapper {
  margin-left: 25px;
}
.topNav {
  border-top: 5px solid #3c00cd;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #3c00cd;
  background: -webkit-linear-gradient(to bottom, #3c00cd, #00c6ff);
  background: linear-gradient(to bottom, #3c00cd, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.nosts {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.nosts:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
</style>
