<script setup>
import { ref } from "vue";

const emit = defineEmits(["files-dropped"]);

const active = ref(false);

const setActive = () => {
  active.value = true;
};
const setInactive = () => {
  active.value = false;
};

const onDrop = (e) => {
  setInactive();
  emit("files-dropped", [...e.dataTransfer.files]);
};
</script>

<template>
  <div
    :class="{
      active: active,
    }"
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
div {
  font-size: 2rem;
}

.active {
  background-color: lavender;
  transition: background-color 0.4s ease;
}
</style>
