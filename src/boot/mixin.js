export default {
  methods: {
    normalizeUrl: function(url) {
      return url
        .split("/")
        .slice(0, -1)
        .join("/");
    },
    sortByContentType(content) {
      return content.type === "file" ? 1 : -1;
    }
  }
};
