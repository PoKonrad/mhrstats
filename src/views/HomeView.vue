<script setup>
import BasicContainer from "../components/BasicContainer.vue";
import GrahpCard from "../components/GrahpCard.vue";
import StatBox from "../components/StatBox.vue";
import DoughnutChart from "../components/DoughnutChart.vue";
import RecentHunts from "../components/RecentHunts.vue";
import BasicButton from "../components/BasicButton.vue";
import api from "../components/scripts/api";
import { onMounted, ref } from "vue";
import { computed } from "vue";

const mostHuntedData = ref("");
const faintJson = ref();

const mostHunted = async () => {
  return await api.get("/api/data/stats?type=mostHunted");
};

const getFaintStats = async () => {
  return await api.get("/api/data/stats?type=faintsOverTime&name=Rad");
};

onMounted(async () => {
  const mostHuntedResp = await mostHunted();
  faintJson.value = await getFaintStats();
  mostHuntedData.value = mostHuntedResp.data[0];
});

const faintsStats = computed(() => {
  if (!faintJson.value) {
    return null;
  }
  return faintJson.value.data.map((x) => ({
    x: x.hunt_date.slice(0, 10),
    y: x.carts,
  }));
});
</script>

<template>
  <Suspense>
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
      <BasicContainer width="24rem">
        <BasicContainer width="25rem" :style="{ margin: 0 }">
          <BasicButton @click="$router.push('/addData')">Add Data</BasicButton>
        </BasicContainer>
      </BasicContainer>
      <BasicContainer clear height="18rem">
        <BasicContainer margin="0" height="100%" :style="{ margin: '0.4rem' }">
          <GrahpCard
            v-if="faintsStats"
            label="Carts over Time"
            :data="faintsStats"
          />
        </BasicContainer>
      </BasicContainer>
      <BasicContainer>
        <StatBox
          :text="mostHuntedData.Monster"
          top-text="Most Hunted Monster"
          :image="`https://monsterhunter.fandom.com/wiki/Mizutsune?file=MHRise-Mizutsune_Icon.png`"
        >
          Hunted {{ mostHuntedData.Count }} times
        </StatBox>
      </BasicContainer>
      <BasicContainer width="30rem" height="20rem">
        <DoughnutChart
          :data="[90, 5, 5]"
          :labels="['Completed', 'Returned', 'Failed']"
        />
      </BasicContainer>
      <BasicContainer
        height="20rem"
        width="80rem"
        :style="{ display: 'block' }"
      >
        <RecentHunts />
      </BasicContainer>
    </div>
  </Suspense>
</template>

<style scoped>
.main-box {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
