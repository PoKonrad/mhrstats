<script setup>
import SidePanelButton from "./SidePanelButton.vue";
</script>

<template>
  <div class="bar">
    Hewwo
    <SidePanelButton>uwu</SidePanelButton>
    <SidePanelButton>uwu2</SidePanelButton>
    <SidePanelButton>uwu3</SidePanelButton>
  </div>
</template>

<style scoped>
.bar {
  height: 100vh;
  width: 6rem;
  background-color: #4e586e;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
