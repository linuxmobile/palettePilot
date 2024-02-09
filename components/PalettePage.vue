<script setup>
import { useImage } from '~/composables/useImage.js'

const { colors, imageUrl } = useImage()
</script>
<template>
  <div v-if="imageUrl" class="flex justify-content-center py-4">
    <img :src="imageUrl" alt="Uploaded Image Preview" class="w-96 aspect-auto" />
  </div>
  <div class="flex justify-content-center pt-4">
    <div v-for="(color, index) in colors" :key="index" class="size-30 font-bold flex items-center justify-center" :style="{ backgroundColor: color }">
      <span class="mix-blend-exclusion">{{color}}</span>
    </div>
  </div>
</template>
