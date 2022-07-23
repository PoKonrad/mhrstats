<script setup>
import { computed } from "vue";
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";
import fitToContainer from "./scripts/fitToContainer";
Chart.register(...registerables);

const props = defineProps(["label", "label2", "data", "data2", "text"]);

const canvas = ref(null);

const data = computed(() => {
  return {
    datasets: [
      {
        label: props.label,
        data: props.data,
        fill: true,
        borderColor: "#1AC9E6",
        tension: 0.2,
        yAxisID: "y",
      },
      {
        label: props.label2,
        data: props.data2,
        fill: true,
        borderColor: "#6c7ae0",
        tension: 0.2,
        yAxisID: "y2",
      },
    ],
  };
});

const config = computed(() => {
  return {
    type: "line",
    data: data.value,
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: props.text,
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  };
});
onMounted(() => {
  fitToContainer(canvas.value);
  const ctx = canvas.value.getContext("2d");
  new Chart(ctx, config.value);
  console.log(config.value);
});
</script>

<template>
  <canvas ref="canvas" width="400" height="400"></canvas>
</template>
