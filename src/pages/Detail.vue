<template>
  <q-page v-if="repository" class="q-pa-xl">
    <header class="flex space-between">
      <div>
        <h5 class="q-my-xs">
          {{ repository.owner.login }} /
          <strong>{{ repository.name }}</strong>
        </h5>
        <p>
          {{ repository.description }}
        </p>
      </div>
      <q-badge color="grey" class="star-badge">
        <q-icon name="star" /> <span>Star</span>
        <span>{{ repository.stargazers_count }}</span>
      </q-badge>
    </header>
    <Explorer :repository="repository" />
  </q-page>
  <Spinner v-else />
</template>

<script>
import repositoriesApi from "../services/repositories.js";
import Spinner from "../components/Spinner";
import Explorer from "../components/Explorer";

export default {
  components: {
    Spinner,
    Explorer
  },
  data() {
    return {
      repository: null,
      contents: [],
      pathSegments: [],
      fileContent: null
    };
  },
  async created() {
    await this.getRepoDetail();
  },
  methods: {
    async getRepoDetail() {
      const { user, repo } = this.$route.params;
      this.repository = await repositoriesApi.getRepoDetail(`${user}/${repo}`);

      if (!this.repository) {
        this.$router.push("/404");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.star-badge {
  height: 2rem;
}
</style>
