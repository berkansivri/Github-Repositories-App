<template>
  <div class="content">
    <q-icon :name="icon(content)" size="xs" :color="color(content)" />
    <span class="q-ml-sm name" @click="openContent">{{ content.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    content: Object
  },
  methods: {
    icon({ type }) {
      return type === "file" ? "far fa-file" : "fas fa-folder";
    },
    color({ type }) {
      return type === "file" ? "" : "light-blue";
    },
    openContent() {
      this.$emit("open", this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eaecef;

  .name {
    cursor: pointer;

    &:hover {
      color: blue;
      text-decoration: underline;
    }
  }
}
</style>
