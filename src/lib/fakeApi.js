const data = {
  activities: {
    1546968934: {
      id: "1546968934",
      title: "Test one",
      notes: "I started today and it was not good.",
      progress: 50,
      category: "",
      createdAt: 1546969144391,
      updatedAt: 1546969144391,
    },
    1546969212: {
      id: "1546969212",
      title: "Test two",
      notes: "These task are super nice",
      progress: 100,
      category: "",
      createdAt: 1546969144391,
      updatedAt: 1546969144391,
    },
  },
  categories: {
    1546969049: { text: "frontend", id: "1546969049" },
    1546969225: { text: "Backend", id: "1546969225" },
  },
};

class FakeApi {
  dB() {
    this.dataCommit(data);
  }

  dataCommit(data) {
    localStorage.setItem("activity_data", JSON.stringify(data));
  }

  dataGet() {
    const activityData = localStorage.getItem("activity_data");
    return JSON.parse(activityData);
  }

  Continue() {
    const randNumber = Math.floor(Math.random() * 10);

    if (randNumber > 5) {
      return true;
    }
    return false;
  }

  get(resource, { force = 0 }) {
    return new Promise((resolve, reject) => {
      this.asyncCall(() => {
        if (force || this.Continue()) {
          const data = this.dataGet();
          resolve({ ...data[resource] });
        } else {
          reject("Cannot fetch" + resource);
        }
      });
    });
  }
  post(resource, item) {
    return new Promise((resolve, reject) => {
      const data = this.dataGet();
      data[resource][item.id] = item;
      this.dataCommit(data);
      resolve(item);
      reject;
    });
  }

  delete(resource, item) {
    return new Promise((resolve, reject) => {
      const data = this.dataGet();
      delete data[resource][item.id];
      this.dataCommit(data)
      resolve(item);
      reject;
    });
  }

  asyncCall(callback) {
    setTimeout(callback, 1000);
  }
}

export default new FakeApi();
