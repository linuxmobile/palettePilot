<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'title',
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center bg-black text-white relative">
    <div class="flex items-start justify-start h-full px-10 pt-12">
      <div class="flex flex-col justify-between w-full h-full">
        <h1 class="text-5xl font-black text-left">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>
