<script setup>
import InputSwitch from 'primevue/inputswitch';
const { bg, fg } = useColors()

const checked = ref(true)
</script>
<template>
  <div class="rounded-xl px-8 py-5 flex flex-col relative" :style="{ backgroundColor: bg, color: fg }">
    <h4 class="text-2xl font-semibold">Cookie Settings</h4>
    <p class="text-sm">Manage your cookie settings here.</p>
    <div class="flex flex-col gap-y-4 pt-6 [&>div]:flex [&>div]:items-center [&>div]:justify-between">
      <div>
        <div>
          <p class="font-semibold">Strictly Necesary</p>
          <p class="max-w-xs opacity-80">These Cookies are Essential in order yo use the website and use its features.</p>
        </div>
        <InputSwitch v-model="checked" />
      </div>
      <div>
        <div>
          <p class="font-semibold">Functional Cookies</p>
          <p class="max-w-xs opacity-80">These Cookies are allow the website to provide personalized functionality.</p>
        </div>
        <InputSwitch v-model="unchecked" />
      </div>
      <div>
        <div>
          <p class="font-semibold">Performance Cookies</p>
          <p class="max-w-xs opacity-80">These Cookies helpo to improve the performance of the website.</p>
        </div>
        <InputSwitch v-model="unchecked" />
      </div>
    </div>
    <span class="w-full py-2 text-center rounded-lg mt-3" :style="{ backgroundColor: fg, color: bg }">Save Preferences</span>
  </div>
</template>
