<script setup>
import StatNumeric from "./StatNumeric.vue";
</script>

<template>
  <div class="numeric-long-container">
    <StatNumeric number="5000"> Highest Damage Dealt </StatNumeric>
    <StatNumeric number="57"> Number of Quests </StatNumeric>
    <StatNumeric number="21"> Number of Carts </StatNumeric>
  </div>
</template>

<style scoped>
.numeric-long-container {
  background-color: white;
  width: 50rem;
  height: 10rem;
  box-shadow: 8px 8px 24px 0px rgba(224, 228, 228, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
