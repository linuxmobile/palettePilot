<script setup>
const { bg, fg } = useColors()
</script>
<template>
  <div
    class="px-8 py-5 rounded-xl flex flex-col gap-y-2"
    :style="{ backgroundColor: bg, color: fg }"
  >
    <h4 class="text-2xl font-semibold">New Project</h4>
    <div
      class="flex flex-col gap-y-1 rounded-xl px-5 py-3"
      :style="{ backgroundColor: fg, color: bg }"
    >
      <p class="text-xs"><span>●</span> Active</p>
      <p class="font-semibold">CRM Platform Development</p>
      <p class="font-light">Client: Faster Dev LLC</p>
    </div>
    <div
      class="flex flex-col gap-y-1 rounded-xl px-5 py-3"
      :style="{ backgroundColor: fg, color: bg }"
    >
      <p class="text-xs"><span>●</span> Active</p>
      <p class="font-semibold">Webflow Design barber Shop</p>
      <p class="font-light">Client: Barber Chop inc.</p>
    </div>
  </div>
</template>
