<script setup>
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";
import fitToContainer from "./scripts/fitToContainer";
Chart.register(...registerables);

const props = defineProps(["label", "data", "data2"]);

const canvas = ref(null);

const data = {
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
      label: props.label,
      data: "data2",
      fill: true,
      borderColor: "#6c7ae0",
      tension: 0.2,
      yAxisID: "y2",
    },
  ],
};

const config = {
  type: "line",
  data: data,
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
        text: "Chart.js Line Chart - Multi Axis",
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
