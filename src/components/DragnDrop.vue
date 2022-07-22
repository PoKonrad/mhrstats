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
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <p><slot></slot></p>
  </div>
</template>

<style scoped lang="scss">
p {
  font-size: 2rem;
}
</style>
