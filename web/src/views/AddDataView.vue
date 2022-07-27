<script setup>
import BasicContainer from "../components/BasicContainer.vue";
import BasicButton from "../components/BasicButton.vue";
import DragnDrop from "../components/DragnDrop.vue";
import api from "../components/scripts/api";
import { ref } from "vue";

const errorText = ref();

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
  errorText.value = "";
  e.forEach(async (file) => {
    if (file.type !== "application/json") {
      errorText.value = "Only JSON Files allowed";
      return;
    }
    const fileContents = await readFileAsync(file);
    const fileJson = JSON.parse(fileContents);
    fileJson.date = file.lastModified;
    try {
      await api.post("api/data/addData", fileJson);
    } catch (err) {
      if (err.status == 403) {
        errorText.value = "No permission to add new files.";
      }
    }
  });
};
</script>
<template>
  <div class="add-container">
    <BasicContainer class="tall-wide-container">
      <BasicContainer class="tall-container" clear>
        <DragnDrop @files-dropped="handleFileDrop">
          <BasicContainer class="dragndrop-container">
            Drag file here to upload
            <p>{{ errorText }}</p>
          </BasicContainer>
        </DragnDrop>
      </BasicContainer>
    </BasicContainer>
  </div>
</template>

<style scoped lang="scss">
.add-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 3rem;
}

.tall-container {
  height: 50rem;
  width: 30rem;
  flex-direction: column;
  justify-content: center;
}
.tall-wide-container {
  height: 50rem;
  width: 60rem;
  flex-direction: column;
  justify-content: center;
}

.dragndrop-container {
  flex-direction: column;
  justify-content: center;
  & p {
    font-size: 1rem;
    color: red;
  }
}
</style>
