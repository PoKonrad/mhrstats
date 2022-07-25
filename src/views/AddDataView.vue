<script setup>
import FormInput from "../components/FormInput.vue";
import BasicContainer from "../components/BasicContainer.vue";
import BasicButton from "../components/BasicButton.vue";
import { ref } from "vue";
import DragnDrop from "../components/DragnDrop.vue";
import api from "../components/scripts/api";

const files = ref("");

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
  });
};

const handleFileDrop = async (e) => {
  console.log(e);
  e.forEach(async (file) => {
    if (file.type !== "application/json") {
      return;
    }
    const fileContents = await readFileAsync(file);
    const fileJson = JSON.parse(fileContents);
    fileJson.date = file.lastModified;

    await api.post("api/data/addData", fileJson);
  });
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
        <DragnDrop @files-dropped="handleFileDrop">
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
