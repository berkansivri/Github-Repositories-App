<template>
  <div class="content-list">
    <Spinner v-if="isLoading" />
    <q-breadcrumbs gutter="sm" class="q-mb-sm segments">
      <q-breadcrumbs-el
        v-for="segment in segments"
        :key="segment.id"
        :label="segment.name"
        @click="openSegment(segment)"
      />
    </q-breadcrumbs>
    <q-card flat bordered>
      <div v-if="fileContent" class="file-content">
        <q-input :value="fileContent" filled type="textarea" disable autogrow />
      </div>
      <Content
        v-else
        v-for="content in contents"
        :key="content.sha"
        :content="content"
        @open="openContent"
      />
    </q-card>
  </div>
</template>

<script>
import Content from "./Content";
import Spinner from "./Spinner";
import mixin from "../boot/mixin";

export default {
  mixins: [mixin],
  components: {
    Content,
    Spinner
  },
  props: {
    repository: Object
  },
  data() {
    return {
      segments: [],
      fileContent: null,
      contents: [],
      isLoading: false
    };
  },
  created() {
    this.getContents();
  },
  methods: {
    async getContents() {
      this.isLoading = true;
      const contentsUrl = this.normalizeUrl(this.repository.contents_url);
      const response = await this.$axios(contentsUrl);
      this.contents = response.sort(this.sortByContentType);

      this.segments.push({
        id: this.repository.id,
        name: this.repository.name,
        contents: this.contents
      });
      this.isLoading = false;
    },
    async openContent(content) {
      this.isLoading = true;
      const response = await this.$axios(content.url);

      if (response.type === "file") {
        this.fileContent = atob(response.content); // decode from base64
      } else {
        this.contents = response.sort(this.sortByContentType);
      }

      this.segments.push({
        id: content.sha,
        name: content.name,
        contents: this.contents
      });
      this.isLoading = false;
    },
    openSegment(segment) {
      this.fileContent = null;
      this.contents = segment.contents;

      const selectedSegmentIndex = this.segments.findIndex(
        seg => seg.id === segment.id
      );
      this.segments = this.segments.slice(0, selectedSegmentIndex + 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.content-list {
  min-width: 50%;

  .segments {
    font-size: 1.5rem;
    color: blue;
    span:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.file-content {
  max-height: 700px;
  overflow: scroll;
  resize: none;
}
</style>
