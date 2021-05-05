import axios from "../boot/axios";

export default {
  getRepositories() {
    return axios.get("repositories");
  },
  searchRepositories(q) {
    return axios.get("search/repositories", {
      params: {
        q
      }
    });
  },
  getRepoInfo(name) {
    return axios.get(`repos/${name}`);
  },
  getCommits(name) {
    return axios.get(`repos/${name}/commits`);
  }
};
