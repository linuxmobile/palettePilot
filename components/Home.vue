<script setup>
import AddImage from '~/icons/AddImage.vue'
import { useImage } from '../../composables/useImage.js'
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";

const { setImageUrl, extractColors } = useImage();

const onUpload = (event) => {
  const file = event.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    setImageUrl(e.target.result);
    extractColors(e.target.result);
  };
  reader.readAsDataURL(file);
};

</script>
<template>
  <main class="min-h-screen grid place-content-center">
    <Toast group="br" position="bottom-right" />
    <FileUpload
      name="demo[]"
      url="#"
      @upload="onUpload"
      accept="image/*"
      :maxFileSize="10000000"
      :auto="true"
      :showCancelButton="false"
      :showUploadButton="false"
      :pt="{
        root:{class:'bg-transparent'},
        input:{class:'opacity-0'},
        chooseButton:{class: 'w-full'},
        file:{class:'hidden'}
      }"
      class="relative"
    >
    <template #empty>
        <h1 class="font-medium text-lg text-center">Drop Your Image</h1>
        <p class="text-sm text-gray-500 text-center">or click to select from computer</p>
        <p class="text-sm text-center pt-2 text-gray-300">(png, jpeg, webp & svg)</p>
    </template>
    </FileUpload>
  </main>
</template>
