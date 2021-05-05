<template>
  <q-page>
    <div class="q-pa-lg">
      <q-table
        title="Repositories"
        :data="data"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[10, 20, 30, 40, 50]"
        :loading="loading"
      >
        <template v-slot:top-right>
          <q-input
            dense
            v-model="filter"
            @keyup.enter="search"
            placeholder="Search"
            class="search-input"
            maxlength="50"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import githubApi from "../services/github.js";

export default {
  name: "PageIndex",
  data() {
    return {
      columns: [
        {
          name: "name",
          label: "Name",
          required: true,
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "description",
          label: "Description",
          align: "left",
          field: field => (field.description || "").slice(0, 30) + "..."
        },
        {
          name: "owner",
          label: "Owner",
          required: true,
          align: "left",
          sortable: true,
          field: field => field.owner.login
        },
        {
          name: "stars",
          label: "Stars",
          align: "left",
          sortable: true,
          field: field => field.stargazers_count
        },
        {
          name: "last_commit",
          label: "Latest Commit",
          align: "right",
          sortable: true,
          sort: (a, b) => date.getDateDiff(a, b),
          field: field =>
            date.formatDate(field.updated_at, "MMM D, YYYY, HH:mm")
        }
      ],
      data: [],
      filter: "",
      loading: false
    };
  },
  async created() {
    this.data = await this.getRepositories();
  },
  methods: {
    async getRepositories() {
      this.loading = true;

      const repositories = await githubApi.getRepositories();
      const data = await Promise.all(
        repositories.map(async repo => ({
          ...repo,
          ...(await githubApi.getRepoInfo(repo.full_name))
        }))
      );

      this.loading = false;
      return data;
    },
    async searchRepositories() {
      this.loading = true;
      const data = await githubApi.searchRepositories(this.filter);

      this.loading = false;
      return data.items;
    },
    async search() {
      this.data = await this.searchRepositories();
    }
  }
};
</script>

<style scoped>
.search-input {
  width: 300px;
}
</style>
