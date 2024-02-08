<script setup>
import { useImage } from '../../composables/useImage.js'
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const { imageUrl, colors, setImageUrl, extractColors } = useImage();

const onUpload = (event) => {
  const file = event.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    setImageUrl(e.target.result);
    extractColors(e.target.result);
  };
  reader.readAsDataURL(file);

  toast.add({
    severity: "success",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
    group: "br"
  });
};
</script>

<template>
  <div class="card flex justify-content-center">
    <Toast group="br" position="bottom-right" />
    <FileUpload
      mode="basic"
      name="demo[]"
      url="#"
      @upload="onUpload"
      accept="image/*"
      :maxFileSize="10000000"
      :auto="true"
    >
    </FileUpload>
  </div>
  <div v-if="imageUrl" class="flex justify-content-center py-4">
    <img :src="imageUrl" alt="Uploaded Image Preview" class="w-96 aspect-auto" />
  </div>
  <div class="flex justify-content-center pt-4">
    <div v-for="(color, index) in colors" :key="index" class="size-30 font-bold flex items-center justify-center" :style="{ backgroundColor: color }">
      <span class="mix-blend-exclusion">{{color}}</span>
    </div>
  </div>
</template>
