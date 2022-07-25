<script setup>
const props = defineProps({
  clear: {
    default: false,
    type: Boolean,
  },
});
</script>

<template>
  <div
    class="numeric-long-container"
    :class="{
      clear: props.clear,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.numeric-long-container {
  background-color: white;
  width: v-bind(width);
  height: v-bind(height);
  box-shadow: 8px 8px 24px 0px rgba(224, 228, 228, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
}

.clear {
  background-color: none;
  box-shadow: none;
}
</style>
