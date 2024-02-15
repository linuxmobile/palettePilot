<script setup>
import Check from '~/icons/Check.vue'
import FileUpload from '~/components/FileUpload.vue'
import Swap from '~/icons/Swap.vue'
import Dropdown from 'primevue/dropdown'

import { useImage } from '~/composables/useImage.ts'
import { useContrastRatio } from '~/composables/useContrastRatio.ts'
import { useColorSelection } from '~/composables/useColorSelection.ts'

const dropdownOptions = computed(() => colors.value.map(color => ({ label: color.hex, value: color })));

const handlePrimaryColorChange = (event) => {
  const selectedValue = event.value;
  selectPrimaryColor(selectedValue);
};

const handleAccentColorChange = (event) => {
  const selectedValue = event.value;
  selectAccentColor(selectedValue);
};

const { colors, imageSrc } = useImage()
const { contrastRatio, markSelectedColor, checkIfColorSelected } =
  useContrastRatio()

const {
  swapColors,
  primaryColor,
  accentColor,
  selectPrimaryColor,
  selectAccentColor,
} = useColorSelection(colors.value)

</script>

<template>
  <aside
    class="md:col-span-3 pt-18 min-h-screen w-full sticky px-3 border-r border-white/10 bg-stone-950"
  >
    <header class="flex flex-col gap-y-2">
      <picture
        v-if="imageSrc"
        class="flex w-full h-62 rounded-md overflow-hidden"
      >
        <img
          :src="imageSrc"
          alt="Uploaded Image Preview"
          class="w-full aspect-video object-cover object-center-center rounded-md transition-transform ease-in-out duration-300 scale-100 hover:scale-105"
        />
      </picture>
      <FileUpload />
    </header>
    <main class="pt-10">
      <section class="font-medium text-xl text-gray-400">
        <div class="w-full flex items-center justify-between pb-10">
          <Dropdown 
            v-if="primaryColor"
            v-model="primaryColor"
            :options="dropdownOptions"
            checkmark
            @change="handlePrimaryColorChange"
            :highlightOnSelect="false"
            optionValue="value"
            class="size-20"
            :style="{backgroundColor:primaryColor.hex}">
            <template #value="slotProps">
              <div v-if="slotProps.value"></div>
            </template>
            <template #option="slotProps">
              <div :style="{backgroundColor:slotProps.option.value.hex}" class="w-full h-6"></div>
            </template>
          </Dropdown>
          <button @click="swapColors">
            <Swap/>
          </button>
          <Dropdown 
            v-if="accentColor"
            v-model="accentColor"
            :options="dropdownOptions"
            checkmark
            @change="handleAccentColorChange"
            :highlightOnSelect="false"
            optionValue="value"
            class="size-20"
            :style="{backgroundColor:accentColor.hex}">
            <template #value="slotProps">
              <div v-if="slotProps.value"></div>
            </template>
            <template #option="slotProps">
              <div :style="{backgroundColor:slotProps.option.value.hex}" class="w-full h-6"></div>
            </template>
          </Dropdown>

        </div>
        <span v-if="contrastRatio !== undefined">
          Contrast Ratio: {{ contrastRatio }}
        </span>
      </section>
      <div class="grid grid-cols-5 justify-content-center gap-y-1 gap-x-2">
        <div
          v-for="(color, index) in colors"
          :key="index"
          class="relative w-full aspect-square h-auto"
          :style="{ backgroundColor: color.hex }"
          aria-label="{{ checkIfColorSelected(color) ? 'Deselect' : 'Select' }} color with hex code {{ color.hex }} }}"
        >
        </div>
          <span v-for="(color, index) in colors" :key="index" class="mix-blend-exclusion">{{ color.hex }}</span>
      </div>
    </main>
  </aside>
</template>
