<script setup>
const { bg, fg } = useColors()
</script>
<template>
  <div class="px-8 py-5 rounded-xl flex flex-col gap-y-2" :style="{ backgroundColor: bg, color: fg }">
    <h4 class="text-2xl font-semibold">Payments</h4>
    <div class="flex items-center justify-between w-full">
      <p><span>●</span> Angular</p>
      <p class="font-semibold">-$39.40</p>
    </div>
    <div class="flex items-center justify-between w-full">
      <p><span>●</span> Google Cloud</p>
      <p class="font-semibold">-$39.40</p>
    </div>
  </div>
</template>
