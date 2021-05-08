<template>
  <q-badge color="grey-2" class="badge">
    <div class="flex items-center cursor-pointer" @click="$emit('toggle')">
      <q-icon :name="icon" size="xs" />
      <span>{{ label }}</span>
    </div>
    <span class="value">{{ value }}</span>
  </q-badge>
</template>

<script>
export default {
  props: {
    label: String,
    value: Number,
    icon: String
  }
};
</script>

<style lang="scss" scoped>
.badge {
  display: flex;
  height: 2rem;
  color: black;
  border: 1px solid lightgrey;
  padding: 0 0 0 10px;
  justify-content: stretch;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  .q-icon {
    margin-right: 3px;
  }

  .value {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-left: 10px;
    height: 100%;
    border-left: 1px solid lightgrey;
    background-color: white;
  }
}
</style>
