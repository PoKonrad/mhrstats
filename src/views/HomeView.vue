<script setup>
import BasicContainer from "../components/BasicContainer.vue";
import GrahpCard from "../components/GrahpCard.vue";
import StatBox from "../components/StatBox.vue";
import DoughnutChart from "../components/DoughnutChart.vue";

const grahpTemp = {
  1: 2,
  2: 4,
  3: 5,
  4: 8,
  5: 2,
  6: 0,
  7: 10,
  8: 2,
};
</script>

<template>
  <div class="main-box">
    <BasicContainer>
      <StatBox text="5000"> Highest Damage Dealt </StatBox>
      <StatBox text="57"> Number of Quests </StatBox>
      <StatBox text="21"> Number of Carts </StatBox>
    </BasicContainer>
    <BasicContainer width="24rem">
      <StatBox
        text="51251"
        top-text="Highest Hit"
        image="https://static.wikia.nocookie.net/fanonmonsterhunter/images/c/c2/Great_Sword_Icon_White.png"
      >
        Dealt by Rad
      </StatBox>
    </BasicContainer>
    <BasicContainer clear height="18rem">
      <BasicContainer margin="0" height="100%" :style="{ margin: '0.4rem' }">
        <GrahpCard label="Carts over Time" :data="grahpTemp" />
      </BasicContainer>
      <BasicContainer margin="0" height="100%" :style="{ margin: '0.4rem' }">
        <GrahpCard label="Carts over Time" :data="grahpTemp" />
      </BasicContainer>
    </BasicContainer>
    <BasicContainer>
      <StatBox
        text="NARGACUGA"
        top-text="Most Hunted Monster"
        image="https://static.wikia.nocookie.net/monsterhunter/images/4/46/MHRise-Nargacuga_Icon.png"
      >
        Hunted 51 times
      </StatBox>
    </BasicContainer>
    <BasicContainer width="30rem" height="20rem">
      <DoughnutChart
        :data="[90, 5, 5]"
        :labels="['Completed', 'Returned', 'Failed']"
      />
    </BasicContainer>
  </div>
</template>

<style scoped>
.main-box {
  display: flex;
  align-content: baseline;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
