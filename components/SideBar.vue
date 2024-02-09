<script setup>
import Check from '~/icons/Check.vue'
import FileUpload from '~/components/FileUpload.vue'
import { useImage } from '~/composables/useImage.ts'
import { useContrastRatio } from '~/composables/useContrastRatio.ts'

const { colors, imageUrl } = useImage()
const { contrastRatio, markSelectedColor, checkIfColorSelected } =
  useContrastRatio()
</script>

<template>
  <aside
    class="md:col-span-3 pt-18 min-h-screen w-full sticky px-3 border-r border-white/10 bg-stone-950"
  >
    <header class="flex flex-col gap-y-2">
      <picture
        v-if="imageUrl"
        class="flex w-full h-62 rounded-md overflow-hidden"
      >
        <img
          :src="imageUrl"
          alt="Uploaded Image Preview"
          class="w-full aspect-video object-cover object-center-center rounded-md transition-transform ease-in-out duration-300 scale-100 hover:scale-105"
        />
      </picture>
      <FileUpload />
    </header>
    <main class="pt-10">
      <div class="font-medium text-xl text-gray-400">
        <span v-if="contrastRatio !== undefined">
          Contrast Ratio: {{ contrastRatio }}
        </span>
        <span v-else class="text-sm"
          >Select two colors to see ContrastRatio</span
        >
      </div>
      <div class="flex justify-content-center">
        <button
          @click="() => markSelectedColor(color)"
          v-for="(color, index) in colors"
          :key="index"
          class="relative size-30 font-bold flex items-center justify-center"
          :style="{ backgroundColor: color.hex }"
          aria-label="{{ checkIfColorSelected(color) ? 'Deselect' : 'Select' }} color with hex code {{ color.hex }} }}"
        >
          <Check
            v-if="checkIfColorSelected(color)"
            className="absolute top-1 right-1 w-6 h-6"
          />
          <span class="mix-blend-exclusion">{{ color.hex }}</span>
        </button>
      </div>
    </main>
  </aside>
</template>
