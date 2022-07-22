<template>
  <button @click="$emit('buttonClick')"><slot></slot></button>
</template>

<style scoped lang="scss">
button {
  outline: none;
  border: none;
  margin: 2rem;
  width: 100%;
  height: 4rem;
  font-size: 2rem;
  font-weight: 500;
  background-color: #6c7ae0;
  transition: 0.1s ease;
  border-radius: 0.4rem;
  color: white;

  &:active {
    background-color: #8793ef;
  }
}
</style>
