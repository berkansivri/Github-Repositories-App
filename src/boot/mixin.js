export default {
  methods: {
    normalizeUrl: function(url) {
      return url.split("{")[0];
    },
    sortByContentType(content) {
      return content.type === "file" ? 1 : -1;
    }
  }
};
