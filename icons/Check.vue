<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="className"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const { className } = defineProps({
  className: {
    type: String,
    default: 'w-6 h-6'
  }
})
</script>
