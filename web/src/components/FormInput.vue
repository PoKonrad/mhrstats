<script setup>
defineProps(["inputType", "modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-input-container">
    <label for="input"><slot></slot></label>
    <input
      :type="inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped lang="scss">
input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: gray;
  transition: 0.5s ease;
  font-size: 1.5rem;
  width: 100%;

  &:focus {
    border-color: blue;
  }
}
.form-input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

label {
  margin-bottom: 1rem;
}
</style>
