<script setup lang="ts">
import FileUpload from '~/components/FileUpload.vue'
import Swap from '~/icons/Swap.vue'
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown'
import { useImage } from '~/composables/useImage'
import { useContrastRatio } from '~/composables/useContrastRatio'
import { useColorSelection } from '~/composables/useColorSelection'
import { type ColorWithRgbAndHex } from '~/types/colors'

const { colors, imageSrc } = useImage()

const {
  swapColors,
  primaryColor,
  accentColor,
  selectPrimaryColor,
  selectAccentColor,
} = useColorSelection(colors.value)
 
const dropdownOptions = computed(() => colors.value.map(color => ({ label: color.hex, value: color })));

const handlePrimaryColorChange = (event: DropdownChangeEvent) => {
  const selectedValue = event.value as ColorWithRgbAndHex;
  selectPrimaryColor(selectedValue);
};

const handleAccentColorChange = (event: DropdownChangeEvent) => {
  const selectedValue = event.value as ColorWithRgbAndHex;
  selectAccentColor(selectedValue);
};


const { contrastRatio } = useContrastRatio(primaryColor, accentColor)
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
    <main class="pt-10 flex flex-col gap-y-4">
      <section class="font-medium text-xl text-gray-400 flex flex-col items-start justify-center gap-y-3">
        <div class="w-full flex items-center justify-between">
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
        <p v-if="colors">
          Contrast Ratio: <span :class="[contrastRatio > 4.5 ? 'text-green-500' : 'text-red-500']">{{ contrastRatio }}</span>
        </p>
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
