<template>
  <q-page v-if="repository" class="q-pa-xl">
    <div class="flex justify-between">
      <div class="repository-name">
        <h5 class="q-my-xs">
          {{ repository.owner.login }} /
          <strong>{{ repository.name }}</strong>
        </h5>
        <p>
          {{ repository.description }}
        </p>
      </div>
      <div class="flex">
        <RepoBadge
          :label="isFavorite ? 'Unstar' : 'Star'"
          :value="repository.stargazers_count"
          :icon="isFavorite ? 'star' : 'star_border'"
          @toggle="toggleStar"
        />
        <RepoBadge
          label="Fork"
          :value="repository.forks"
          icon="fas fa-code-branch"
          class="q-ml-md"
        />
      </div>
    </div>
    <RepoTabs class="q-mt-md" :repository="repository" />
  </q-page>
  <Spinner v-else />
</template>

<script>
import { mapActions } from "vuex";
import repositoriesApi from "../services/repositories.js";
import Spinner from "../components/Spinner";
import RepoTabs from "../components/RepoTabs";
import RepoBadge from "../components/RepoBadge";

export default {
  components: {
    Spinner,
    RepoTabs,
    RepoBadge
  },
  data() {
    return {
      repository: null,
      contents: [],
      pathSegments: [],
      fileContent: null
    };
  },
  computed: {
    isFavorite() {
      return this.$store.getters.isFavorite(this.repository.id);
    }
  },
  created() {
    this.getRepoDetail();
  },
  methods: {
    ...mapActions(["toggleFavorite"]),
    async getRepoDetail() {
      const { user, repo } = this.$route.params;
      this.repository = await repositoriesApi.getRepoDetail(`${user}/${repo}`);

      if (!this.repository) {
        this.$router.push("/404");
      }
    },
    toggleStar() {
      this.toggleFavorite(this.repository.id);
      // simulate to increase star count
      this.$set(
        this.repository,
        "stargazers_count",
        this.repository.stargazers_count + (this.isFavorite ? 1 : -1)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.repository-name {
  h5 {
    margin-top: 0px;
  }
}
</style>
