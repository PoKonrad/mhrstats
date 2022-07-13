<script setup>
const props = defineProps(["text", "image", "topText"]);
</script>

<template>
  <div class="stat-box-container">
    <p class="top-text">{{ props.topText }}</p>
    <div class="verticalAlign">
      <p class="middle-text">
        {{ props.text }}
      </p>
      <img :src="image" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.top-text {
  margin: 0;
  padding: 0;
  margin-bottom: -1rem;
  font-size: 1.2rem;
}
.middle-text {
  font-size: 3.8rem;
  font-weight: 500;
}
.stat-box-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
}

img {
  width: 3.8rem;
  margin-left: 0.6rem;
}

.verticalAlign {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  line-height: 6rem;
  justify-content: flex-start;
}
</style>
