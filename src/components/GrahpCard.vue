<script setup>
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";
import fitToContainer from "./scripts/fitToContainer";
Chart.register(...registerables);

const props = defineProps(["label", "data"]);

const canvas = ref(null);

const data = {
  datasets: [
    {
      label: props.label,
      data: props.data,
      fill: true,
      borderColor: "#1AC9E6",
      tension: 0.2,
    },
  ],
};

onMounted(() => {
  fitToContainer(canvas.value);
  const ctx = canvas.value.getContext("2d");

  const chart = new Chart(ctx, {
    type: "line",
    data: data,
  });
});
</script>

<template>
  <canvas ref="canvas" width="400" height="400"></canvas>
</template>
