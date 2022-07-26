<script setup>
import { computed } from "vue";
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";
import fitToContainer from "./scripts/fitToContainer";
Chart.register(...registerables);

const props = defineProps(["labels", "data"]);

const canvas = ref(null);

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      label: "Quest Statistics",
      fill: true,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.2,
      backgroundColor: ["#1DE4BD", "#EF7E32"],
    },
  ],
}));

const chartConfig = computed(() => ({
  type: "doughnut",
  data: chartData.value,
  options: {
    borderWidth: 1,
    cutout: "86%",
    radius: "60%",
    layout: {
      padding: 0,
      margin: 0,
    },
    plugins: {
      legend: {
        position: "left",
        labels: {
          usePointStyle: true,
          boxHeight: 8,
          boxWidth: 8,
          font: {
            size: 15,
          },
        },
      },
    },
  },
}));

onMounted(() => {
  fitToContainer(canvas.value);
  const ctx = canvas.value.getContext("2d");
  new Chart(ctx, chartConfig.value);
  console.log(chartConfig.value);
});
</script>

<template>
  <canvas ref="canvas" width="100" height="100"></canvas>
</template>

<style scoped>
.chart-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

p {
  font-size: 2rem;
  margin: 0.5rem;
}
</style>
