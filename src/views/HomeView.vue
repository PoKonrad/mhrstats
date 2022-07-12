<script setup>
import BasicContainer from "../components/BasicContainer.vue";
import StatNumeric from "../components/StatNumeric.vue";
import GrahpCard from "../components/GrahpCard.vue";

const grahpTemp = {
  1: 2,
  3: 4,
}
</script>

<template>
  <BasicContainer>
    <StatNumeric number="5000"> Highest Damage Dealt </StatNumeric>
    <StatNumeric number="57"> Number of Quests </StatNumeric>
    <StatNumeric number="21"> Number of Carts </StatNumeric>
  </BasicContainer>
  <BasicContainer>
    <GrahpCard label="Carts over Time" :data="grahpTemp" />
  </BasicContainer>
</template>
