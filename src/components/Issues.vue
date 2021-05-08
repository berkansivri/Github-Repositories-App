<template>
  <q-card>
    <Spinner v-if="isLoading" />
    <div class="item" v-for="issue in issues" :key="issue.id">
      <div class="title">
        <q-icon name="error" />
        <strong class="q-ml-sm">{{ issue.title }}</strong>
      </div>
      <div class="detail">
        <small class="q-mr-md">
          {{
            `#${issue.number} opened on ${formatDate(issue.created_at)} 
            by ${issue.user.login}`
          }}
        </small>
        <q-icon name="fas fa-clock" class="q-mr-xs" />
        <small>updated on {{ formatDate(issue.updated_at) }}</small>
      </div>
    </div>
  </q-card>
</template>

<script>
import { date } from "quasar";
import Spinner from "./Spinner";
import mixin from "../boot/mixin";

export default {
  mixins: [mixin],
  components: {
    Spinner
  },
  props: {
    repository: Object
  },
  data() {
    return {
      issues: [],
      isLoading: false
    };
  },
  created() {
    this.getIssues();
  },
  methods: {
    async getIssues() {
      this.isLoading = true;
      const issuesUrl = this.normalizeUrl(this.repository.issues_url);
      this.issues = await this.$axios(issuesUrl);
      this.isLoading = false;
    },
    formatDate(d) {
      return date.formatDate(d, "MMM D");
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  padding: 0.8rem;
  border-bottom: 1px solid lightgrey;

  .detail {
    color: grey;
  }
}
</style>
