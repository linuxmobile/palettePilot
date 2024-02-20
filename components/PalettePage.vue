<script setup>
import SideBar from '~/components/SideBar.vue'
import UIComponents from '~/components/UIComponents.vue'
import MinimalistExample from '~/components/MinimalistExample.vue'
import SelectButton from 'primevue/selectbutton'

const value = useState('value', () => 'Minimalist Example')
const options = useState('options', () => ['Minimalist Example', 'UI Elements'])
</script>

<template>
  <main class="grid grid-cols-1 lg:grid-cols-12">
    <SideBar />
    <div
      class="lg:col-span-9 pt-18 grid justify-items-center overflow-y-auto h-100dvh"
    >
      <SelectButton
        v-model="value"
        :options="options"
        aria-labelledby="basic"
        :pt="{
          button: 'bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-400',
        }"
      />
      <MinimalistExample v-if="value === 'Minimalist Example'" />
      <UIComponents v-else />
    </div>
  </main>
</template>
