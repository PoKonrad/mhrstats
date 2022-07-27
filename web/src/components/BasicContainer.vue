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
    class="basic-container"
    :class="{
      clear: props.clear,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.basic-container {
  background-color: white;
  width: 50rem;
  height: 10rem;
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
