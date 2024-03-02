<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  palette: {
    type: Object,
    default: () => ({})
  }
})

const { copyToClipboard } = useClipboard()
</script>
<template>
  <div class="flex flex-col gap-1">
    <h5 class="font-bold text-gray-600 dark:text-gray-300 text-sm">
      {{ title }}
    </h5>
    <div class="flex">
      <button
        v-for="key in Object.keys(palette)"
        :key="palette[key]"
        v-tooltip.top="`${key}: ${palette[key]}`"
        class="aspect-square w-full md:h-10 2xl:h-auto"
        :style="{ backgroundColor: palette[key] }"
        @click="() => copyToClipboard(palette[key])"
      >
        <span class="sr-only">
          Copy hex color {{ palette[key] }} to clipboard
        </span>
      </button>
    </div>
  </div>
</template>
