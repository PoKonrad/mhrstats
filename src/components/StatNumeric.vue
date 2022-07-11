<script setup>
const props = defineProps(["number"]);
</script>

<template>
  <div class="stat-number-container">
    <p class="big-text">
      {{ props.number }}
    </p>
    <slot></slot>
  </div>
</template>

<style scoped>
.big-text {
  font-size: 4rem;
  font-weight: 500;
  margin: 0;
}
.stat-number-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
