<script setup>
import FormInput from "../components/FormInput.vue";
import BasicContainer from "../components/BasicContainer.vue";
import BasicButton from "../components/BasicButton.vue";
import { reactive, ref } from "vue";
import api from "../components/scripts/api";
import router from "../router/index";
import LoadingCircle from "../components/LoadingCircle.vue";

const login = ref("");
const password = ref("");
const formStatus = reactive({
  loading: false,
  errorStatus: false,
  error: "",
});

const loginPost = async () => {
  try {
    formStatus.errorStatus = false;
    formStatus.error = false;
    formStatus.loading = true;
    const resp = await api.post(
      "/api/auth/login",
      {
        username: login.value,
        password: password.value,
      },
      false
    );
    formStatus.loading = false;
    if (resp.token == undefined) {
      return;
    }
    api.token = resp.token;
    api.refreshToken = resp.refreshToken;
    router.push("/");
  } catch (err) {
    formStatus.loading = false;
    formStatus.error = true;
    if (err.status == 400) {
      formStatus.errorStatus = "Invalid login or password";
    } else formStatus.errorStatus = "An error has occured";
  }
};
</script>
<template>
  <div class="login-container">
    <BasicContainer class="login-container-wide">
      <form @submit.prevent>
        <p>Sign in</p>
        <div class="demo">
          <div>Demo User:</div>
          <div>Username: <strong>demo</strong></div>
          <div>Password: <strong>demo</strong></div>
        </div>
        <FormInput v-model="login" input-type="text">Username</FormInput>
        <FormInput v-model="password" input-type="password">Password</FormInput>
        <BasicButton @click="loginPost">Log in</BasicButton>
        <LoadingCircle :class="{ loading: !formStatus.loading }" />
        <Transition>
          <div
            v-if="formStatus.error || formStatus.loading"
            :class="{ error: formStatus.error }"
            class="loadingText"
          >
            {{ formStatus.errorStatus ? formStatus.errorStatus : "Loading" }}
          </div>
        </Transition>
      </form>
    </BasicContainer>
  </div>
</template>

<style scoped lang="scss">
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

form {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  justify-content: flex-start;
  align-items: center;
  height: 50rem;
  width: 30rem;
}

.login-container-wide {
  width: 50rem;
  height: 50rem;
}

.error {
  color: red;
  font-size: 1.4rem;
}

.loadingText {
  font-size: 1.4rem;
  transition: color 0.1s ease;
}

.loading {
  opacity: 0;
  transition: opacity 0.1s ease;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.demo {
  font-size: 1.2rem;

  & strong {
    font-weight: 900;
  }
}
</style>
