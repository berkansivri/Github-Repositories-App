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
            debounce="300"
            v-model="filter"
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
          name: "owner",
          label: "Owner",
          required: true,
          align: "left",
          sortable: true,
          field: field => field.owner.login
        },
        {
          name: "description",
          label: "Description",
          align: "left",
          field: field => (field.description || "").slice(0, 30) + "..."
        },
        {
          name: "stars",
          label: "Stars",
          align: "left",
          sortable: true,
          field: field => field.repo_info.stargazers_count
        },
        {
          name: "last_commit",
          label: "Latest Commit",
          align: "right",
          sortable: true,
          sort: (a, b) => date.getDateDiff(a, b),
          field: field =>
            date.formatDate(field.repo_info.updated_at, "MMM D, YYYY, HH:mm")
        }
      ],
      data: [],
      filter: "",
      loading: true
    };
  },
  async created() {
    this.data = await this.getData();
    this.loading = false;
  },
  methods: {
    async getData() {
      const repositories = await githubApi.getRepositories();

      return await Promise.all(
        repositories.data.map(async repo => ({
          ...repo,
          repo_info: (await githubApi.getRepoInfo(repo.full_name)).data
        }))
      );
    }
  }
};
</script>

<style scoped>
.search-input {
  width: 300px;
}
</style>
