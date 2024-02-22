<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '~/components/SideBar.vue'
import UIComponents from '~/components/UIComponents.vue'
import MinimalistExample from '~/components/MinimalistExample.vue'
import SelectButton from 'primevue/selectbutton'

const DEMO = {
  LANDING_EXAMPLE: 'Minimalist Example',
  UI_ELEMENTS: 'UI Elements'
}
const OPTIONS = [DEMO.LANDING_EXAMPLE, DEMO.UI_ELEMENTS]
const selectedOption = ref(DEMO.LANDING_EXAMPLE)
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-12 py-12 md:py-0">
    <SideBar />
    <div
      class="lg:col-span-9 pt-18 grid justify-items-center overflow-y-auto h-100dvh"
    >
      <SelectButton
        v-model="selectedOption"
        :options="OPTIONS"
        aria-labelledby="basic"
        :pt="{
          button:
            'bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-400'
        }"
      />
      <MinimalistExample v-if="selectedOption === DEMO.LANDING_EXAMPLE" />
      <UIComponents v-else />
    </div>
  </section>
</template>
