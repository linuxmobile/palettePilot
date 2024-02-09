<script setup>
import Check from '~/icons/Check.vue'
import { useImage } from '~/composables/useImage.js'
import { useContrastRatio } from '~/composables/useContrastRatio.ts'

const { colors, imageUrl } = useImage()
const { contrastRatio, markSelectedColor, checkIfColorSelected } = useContrastRatio()
</script>

<template>
  <div v-if="imageUrl" class="flex justify-content-center py-4">
    <img :src="imageUrl" alt="Uploaded Image Preview" class="w-96 aspect-auto" />
  </div>
  <div class="flex justify-content-center pt-4">
    <button @click="() => markSelectedColor(color)" v-for="(color, index) in colors" :key="index" class="relative size-30 font-bold flex items-center justify-center" :style="{ backgroundColor: color.hex }" aria-label="{{ checkIfColorSelected(color) ? 'Deselect' : 'Select' }} color with hex code {{ color.hex }} }}">
      <div class="absolute top-1 right-1">
         <Check v-if="checkIfColorSelected(color)" /> 
      </div>
      <span class="mix-blend-exclusion">{{color.hex}}</span>
    </button>
  </div>
  <div v-if="contrastRatio !== undefined">Contrast Ratio: {{ contrastRatio }}</div>
</template>
