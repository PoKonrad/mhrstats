<script setup>
import SidePanel from "./components/SidePanel.vue";
import HomeView from "./views/HomeView.vue";
</script>

<template>
  <div class="mainContainer">
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import "@/assets/base.css";
body {
  font-family: "Roboto", sans-serif;
  background-color: aliceblue;
}
</style>

<style scoped>
.mainContainer {
  display: grid;
  grid-template-columns: 0.1fr 1.2fr 1.7fr;
  grid-template-rows: 0.1fr 0.7fr 2.1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "side-panel main main"
    "side-panel main main"
    "side-panel main main";
}

.side-panel {
  grid-area: side-panel;
}

.main {
  grid-area: main;
}
</style>
