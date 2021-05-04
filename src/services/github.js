import axios from "axios";

export default {
  getRepositories() {
    return axios.get("repositories");
  },
  getRepoInfo(name) {
    return axios.get(`repos/${name}`);
  },
  getCommits(name) {
    return axios.get(`repos/${name}/commits`);
  }
};
