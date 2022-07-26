<script setup>
import { computed } from "vue";

const props = defineProps(["monsters", "success", "carts", "damage"]);

const monsterImage = computed(() => {
  if (!props.monsters) {
    return null;
  }
  return props.monsters.map((el) => {
    return new URL(`../assets/monsters/${el}.png`, import.meta.url).href;
  });
});
</script>

<template>
  <tr>
    <td>
      <div class="monster">
        <img
          v-for="(monster, index) in monsterImage"
          :key="index"
          :src="monster"
        />
      </div>
    </td>
    <td>
      <span v-for="(item, index) in monsters" :key="index">{{ item }}</span>
    </td>
    <td :class="props.success ? 'success' : 'failed'">
      {{ success ? "Success" : "Failed" }}
    </td>
    <td>{{ carts }}</td>
    <td>{{ damage }}</td>
  </tr>
</template>

<style scoped lang="scss">
img {
  height: 3rem;
}
.recent-hunt-container {
  height: 4rem;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-inline: 1rem;
}

.success {
  color: #1de4bd;
}

.failed {
  color: #ef7e32;
}
.recent-hunt-stat-container {
  font-size: 2rem;
}

span {
  margin: 0.2rem;
}
</style>
