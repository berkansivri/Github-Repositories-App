<template>
  <q-card>
    <q-tabs
      inline-label
      align="justify"
      class="bg-grey-2 text-black shadow-2"
      active-color="primary"
      v-model="tab"
      narrow-indicator
    >
      <q-tab name="code" icon="fas fa-code" label="Code" />
      <q-tab name="issues" icon="fas fa-exclamation-circle" label="Issues">
        <q-badge color="grey" rounded class="q-ml-xs">
          {{ repository.open_issues_count }}
        </q-badge>
      </q-tab>
      <q-tab name="pullrequests" icon="fab fa-git-alt" label="Pull Requests" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="code">
        <Explorer :repository="repository" />
      </q-tab-panel>
      <q-tab-panel name="issues">
        <Issues :repository="repository" />
      </q-tab-panel>
      <q-tab-panel name="pullrequests">
        TODO
        <!-- <PullRequests /> -->
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import Explorer from "./Explorer";
import Issues from "./Issues";

export default {
  components: {
    Explorer,
    Issues
  },
  props: {
    repository: Object
  },
  data() {
    return {
      tab: "code"
    };
  },
  methods: {}
};
</script>

<style scoped>
.q-tab-panel {
  min-height: 100px;
}
</style>
