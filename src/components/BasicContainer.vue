<script setup>
defineProps({
  width: {
    default: "50rem",
  },
  height: {
    default: "10rem",
  },
});
</script>

<template>
  <div class="numeric-long-container">
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
</style>
