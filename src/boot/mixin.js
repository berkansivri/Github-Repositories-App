export default {
  methods: {
    normalizeUrl: function(url) {
      return url.split("{")[0]; // removes /{sha} part from the url's of GitHub API
    },
    sortByContentType(content) {
      return content.type === "file" ? 1 : -1;
    }
  }
};
