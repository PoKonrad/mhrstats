<script setup>
import FormInput from "../components/FormInput.vue";
import BasicContainer from "../components/BasicContainer.vue";
import BasicButton from "../components/BasicButton.vue";
import { ref } from "vue";

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
          justifyContent: 'flex-start',
          flexBasis: '26rem',
          rowGap: '2rem',
        }"
      >
        <p>Sign in</p>
        <FormInput v-model="login" input-type="text">Username</FormInput>
        <FormInput v-model="password" input-type="password">Password</FormInput>
        <BasicButton @click="test">Log in</BasicButton>
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
