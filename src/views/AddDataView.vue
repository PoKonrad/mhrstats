<script setup>
import FormInput from "../components/FormInput.vue";
import BasicContainer from "../components/BasicContainer.vue";
import BasicButton from "../components/BasicButton.vue";
import { ref } from "vue";
import DragnDrop from "../components/DragnDrop.vue";

const login = ref("");
const password = ref("");

const test = () => {
  console.log(login.value);
  console.log(password.value);
};
</script>
<template>
  <div class="login-container">
    <BasicContainer width="50rem" height="50rem">
      <BasicContainer
        clear
        height="50rem"
        width="30rem"
        :style="{
          flexDirection: 'column',
          justifyContent: 'center',
        }"
      >
        <DragnDrop>
          <BasicContainer width="40rem">
            Drag file here to upload
          </BasicContainer>
        </DragnDrop>
        <BasicButton @click="test">Upload</BasicButton>
      </BasicContainer>
    </BasicContainer>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 3rem;
}
</style>
