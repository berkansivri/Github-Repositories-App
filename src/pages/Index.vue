<template>
  <q-page>
    <div class="q-pa-lg">
      <q-table
        title="Repositories"
        :data="data"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[10, 20, 30, 40, 50]"
        :loading="isLoading"
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

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="md"
                color="blue"
                round
                dense
                @click="() => setFavorite(props)"
                :icon="isFavorite(props.row.id) ? 'star' : 'star_border'"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { date } from "quasar";
import repositoriesApi from "../services/repositories.js";

export default {
  name: "PageIndex",
  data() {
    return {
      columns: [
        {
          label: "Favorite"
        },
        {
          name: "name",
          label: "Name",
          required: true,
          align: "left",
          field: "name",
          sortable: true,
          classes: "bg-grey-2 ellipsis"
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
        },
        {
          label: "Detail"
        }
      ],
      data: [],
      filter: "",
      isLoading: true
    };
  },
  computed: {
    ...mapGetters(["isFavorite"])
  },
  async created() {
    this.data = await this.getRepositories();
    this.isLoading = false;
  },
  methods: {
    async getRepositories() {
      const repositories = await repositoriesApi.getRepositories();
      return await Promise.all(
        repositories.map(async repo => ({
          ...repo,
          ...(await repositoriesApi.getRepoDetail(repo.full_name))
        }))
      );
    },
    async searchRepositories(query) {
      return (await repositoriesApi.searchRepositories(query)).items;
    },
    async search() {
      this.isLoading = true;
      if (!this.filter) {
        this.data = await this.getRepositories();
      } else {
        this.data = await this.searchRepositories(this.filter);
      }
      this.isLoading = false;
    },
    setFavorite({ row }) {
      const mutation = this.isFavorite(row.id)
        ? "removeFavorite"
        : "addFavorite";

      this.$store.commit(mutation, row.id);
    }
  }
};
</script>

<style scoped>
.search-input {
  width: 300px;
}
</style>
