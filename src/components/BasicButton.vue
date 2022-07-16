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
  background-color: #e7e7e7;
  transition: 0.1s ease;
  border-radius: 0.4rem;

  &:active {
    background-color: #f2f2f2;
  }
}
</style>
