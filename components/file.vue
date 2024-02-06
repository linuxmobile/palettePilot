<script setup>
import FileUpload from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast';
import ColorThief from 'colorthief';

const toast = useToast()

const rgbToHex = (colors) => colors.map(([r, g, b]) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}).join(''));

const imageUrl = useState('imageUrl', () => null)
const colors = useState('colors', () => []);

const onUpload = (event) => {
  const file = event.files[0];
  if (!file) return;

  imageUrl.value = null
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result
    const img = new Image();
    img.onload = () => {
      const colorThief = new ColorThief();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const extractedColors = colorThief.getPalette(img, 5);
      colors.value = rgbToHex(extractedColors);
      console.log(colors.value)
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

</script>

<template>
  <div class="card flex justify-content-center">
    <Toast />
    <FileUpload 
      mode="basic"
      name="demo[]"
      url="#"
      accept="image/*"
      :maxFileSize="10000000" 
      @upload="onUpload"
    />
  </div>
  <div v-if="imageUrl" class="flex justify-content-center py-4">
    <img :src="imageUrl" alt="Uploaded Image Preview" class="size-50 aspect-auto" />
  </div>
  <div class="flex justify-content-center pt-4">
    <div v-for="(color, index) in colors" :key="index" class="w-20 h-20" :style="{ backgroundColor: color }"></div>
  </div>
</template>
