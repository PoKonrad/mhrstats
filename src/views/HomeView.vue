<script setup>
import BasicContainer from "../components/BasicContainer.vue";
import GrahpCard from "../components/GrahpCard.vue";
import StatBox from "../components/StatBox.vue";
import DoughnutChart from "../components/DoughnutChart.vue";
import RecentHunts from "../components/RecentHunts.vue";
import BasicButton from "../components/BasicButton.vue";
import api from "../components/scripts/api";
import { onMounted, reactive, ref } from "vue";
import { computed } from "vue";
import router from "../router";

const mostHuntedData = ref("");
const questStatsJson = ref();
const mostDamageJson = ref();
const numberOfCartsJson = ref();
const lastQuestsJson = ref();
const cartJson = reactive({
  player1: "",
  player2: "",
});

const getLastQuests = async () => {
  return await api.get("/api/data/lastQuests");
};

const getNumberOfCarts = async () => {
  return await api.get("/api/data/carts");
};

const getMostDamage = async () => {
  return await api.get("/api/data/highestDamageDone");
};

const getQuestStats = async () => {
  return await api.get("/api/data/questCount");
};

const mostHunted = async () => {
  return await api.get("/api/data/mostHunted");
};

const getFaintStats = async (player) => {
  return await api.get(`/api/data/cartsOverTime/${player}`);
};

onMounted(async () => {
  const mostHuntedResp = await mostHunted();
  mostHuntedData.value = mostHuntedResp.data[0];

  cartJson.player1 = await getFaintStats("Rad");
  cartJson.player2 = await getFaintStats("RedPanda");

  const questStatResp = await getQuestStats();
  questStatsJson.value = questStatResp.data;

  const mostDamageResp = await getMostDamage();
  mostDamageJson.value = mostDamageResp.data[0];

  const numberOfCartsResp = await getNumberOfCarts();
  numberOfCartsJson.value = numberOfCartsResp.data[0];

  const lastQuestsResp = await getLastQuests();
  lastQuestsJson.value = lastQuestsResp.data;
});

const questStats = computed(() => {
  if (!questStatsJson.value) {
    return null;
  }
  return questStatsJson.value[0]?.success
    ? [
        parseInt(questStatsJson.value[0].Count),
        parseInt(questStatsJson.value[1].Count),
      ]
    : [
        parseInt(questStatsJson.value[1].Count),
        parseInt(questStatsJson.value[0].Count),
      ];
});

const mapOverCartsOverTime = (json) => {
  if (!json) {
    return null;
  }
  return json.data.map((x) => ({
    x: x.hunt_date.slice(0, 10),
    y: x.carts,
  }));
};

const faintsStatsPlayer1 = computed(() => {
  return mapOverCartsOverTime(cartJson.player1);
});
const faintsStatsPlayer2 = computed(() => {
  return mapOverCartsOverTime(cartJson.player2);
});

const monsterImage = computed(() => {
  if (!mostHuntedData.value) {
    return null;
  }
  return new URL(
    `../assets/monsters/${mostHuntedData.value.Monster}.png`,
    import.meta.url
  ).href;
});

const logOut = async () => {
  router.replace({ path: "/login" });
  await api.logOut();
};
</script>

<template>
  <div class="main-box">
    <BasicContainer>
      <StatBox>
        <BasicButton @buttonClick="logOut">Log Out</BasicButton>
      </StatBox>
      <Transition>
        <StatBox v-if="questStats" :text="questStats[0] + questStats[1]">
          Number of Quests
        </StatBox>
      </Transition>
      <Transition>
        <StatBox v-if="numberOfCartsJson" :text="numberOfCartsJson.Carts">
          Number of Carts
        </StatBox>
      </Transition>
    </BasicContainer>
    <BasicContainer width="24rem">
      <Transition>
        <StatBox
          v-if="mostDamageJson"
          :text="mostDamageJson.damage"
          top-text="Most Damage Done"
          image="https://static.wikia.nocookie.net/fanonmonsterhunter/images/c/c2/Great_Sword_Icon_White.png"
        >
          Dealt by {{ mostDamageJson.name }}
        </StatBox>
      </Transition>
    </BasicContainer>
    <BasicContainer width="24rem">
      <BasicContainer width="25rem" :style="{ margin: 0 }">
        <BasicButton @click="$router.push('/addData')">Add Data</BasicButton>
      </BasicContainer>
    </BasicContainer>
    <BasicContainer clear height="18rem">
      <BasicContainer margin="0" height="100%" :style="{ margin: '0.4rem' }">
        <Transition>
          <GrahpCard
            text="Carts over time"
            v-if="faintsStatsPlayer1 && faintsStatsPlayer2"
            label="Player1"
            label2="Player2"
            :data="faintsStatsPlayer1"
            :data2="faintsStatsPlayer2"
          />
        </Transition>
      </BasicContainer>
    </BasicContainer>
    <BasicContainer>
      <Transition>
        <Transition>
          <StatBox
            v-if="mostHuntedData"
            :text="mostHuntedData.Monster"
            top-text="Most Hunted Monster"
            :image="monsterImage"
          >
            Hunted {{ mostHuntedData.Count }} times
          </StatBox>
        </Transition>
      </Transition>
    </BasicContainer>
    <BasicContainer width="30rem" height="20rem">
      <Transition>
        <DoughnutChart
          v-if="questStats"
          :data="questStats"
          :labels="['Completed', 'Failed']"
        />
      </Transition>
    </BasicContainer>
    <BasicContainer height="20rem" width="80rem" :style="{ display: 'block' }">
      <Transition>
        <RecentHunts v-if="lastQuestsJson" :recentData="lastQuestsJson" />
      </Transition>
    </BasicContainer>
  </div>
</template>

<style scoped>
.main-box {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
