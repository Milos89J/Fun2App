export default {
  methods: {
    textUtility_capitilize(words) {
      if (words && typeof words === "string") {
        return words.charAt(0).toUpperCase() + words.slice(1);
      }
    },
  },
};
