<script setup>
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";
import fitToContainer from "./scripts/fitToContainer";
Chart.register(...registerables);

const props = defineProps(["label", "data"]);

const canvas = ref(null);

const data = {
  labels: ["Completed", "Returned", "Failed"],
  datasets: [
    {
      data: props.data,
      label: "Quest Statistics",
      fill: true,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.2,
      backgroundColor: ["#1DE4BD", "#1AC9E6", "#EF7E32"],
    },
  ],
};

onMounted(() => {
  fitToContainer(canvas.value);
  const ctx = canvas.value.getContext("2d");

  const chart = new Chart(ctx, {
    type: "doughnut",
    data: data,
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
  });
});
</script>

<template>
  <canvas ref="canvas" width="10" height="10"></canvas>
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
