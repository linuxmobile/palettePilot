<script setup>
import { ref } from 'vue'
import { toPng } from 'html-to-image'
import { useColors } from '~/composables/useColors.ts'
import { useGeneratedPalette } from '~/composables/useGeneratedPalette.ts'
import Dialog from 'primevue/dialog'
import ColorPalette from '~/components/ColorPalette.vue'

const { imageColors, bg, fg } = useColors()

const {
  primaryPalette,
  accentPalette,
  integratedPalette,
} = useGeneratedPalette(bg, fg)

const exportAsImageModal = useState('exportAsImageModal', () => false)

const exportAsPNG = () => {
  const node = document.getElementById('paletteToPNG');
  
  if (!node) {
    console.error('Elemento no encontrado');
    return;
  }

  toPng(node)
    .then(function (dataUrl) {
      const uniqueId = Math.floor(Math.random() * 1000000); // Genera un número aleatorio
      const fileName = `random-palettePilot-${uniqueId}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error('Error when exporting the image:', error);
    });
};

</script>
<template>
  <button 
    class="w-full rounded-md py-3 bg-gray-100 text-gray-500 dark:text-gray-400 dark:bg-neutral-900" 
    @click="exportAsImageModal = true"
  >Export as PNG</button>
    <Dialog
    v-model:visible="exportAsImageModal"
    :pt="{
      root: 'border-none bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-400 overflow-y-auto',
      mask: {
        style: 'backdrop-filter: blur(2px)'
      }
    }"
  >
    <template #container="{ closeCallback }">
      <section
        class="flex flex-col items-center justify-center gap-3 px-12 py-6 2xl:py-14"
      >
        <header
          class="w-full border-b border-gray-500 font-semibold text-xl text-gray-600 dark:text-gray-300"
        >
          <h3>Export Code</h3>
        </header>
        <div class="px-12 py-6 2xl:py-14 bg-gray-100 dark:bg-neutral-900" id="paletteToPNG">
          <section class="grid grid-cols-5 justify-content-center gap-y-1 gap-x-2">
            <div
              v-for="(color, index) in imageColors"
              :key="index"
              class="relative w-full aspect-square h-auto rounded-lg"
              :style="{ backgroundColor: color.hex }"
              aria-label="{{ checkIfColorSelected(color) ? 'Deselect' : 'Select' }} color with hex code {{ color.hex }} }}"
            ></div>
            <div
              v-for="(color, index) in imageColors"
              :key="index"
              class="bg-gray-300 dark:bg-neutral-900 rounded-md 2xl:px-3 py-1 opacity-60 hover:opacity-100 text-xs 2xl:text-base"
            >
              {{ color.hex }}
            </div>
          </section>
          <footer class="flex flex-col gap-4 w-full">
            <ColorPalette
              v-if="primaryPalette.primary"
              title="Primary"
              :palette="primaryPalette.primary"
            />
            <ColorPalette
              v-if="accentPalette.accent"
              title="Accent"
              :palette="accentPalette.accent"
            />
            <ColorPalette
              v-if="integratedPalette.integrated"
              title="From Primary to Accent"
              :palette="integratedPalette.integrated"
            />
          </footer>
        </div>
        <div class="flex items-center justify-between w-full gap-x-2">
          <button 
            @click="exportAsPNG"
            class="mt-4 p-1 2xl:p-3 w-full text-primary-50 border-1 border-white/30 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:border-neutral-700 hover:dark:bg-neutral-700"
          >Export as PNG</button>
          <button
            @click="closeCallback"
            class="mt-4 p-1 2xl:p-3 w-full text-primary-50 border-1 border-white/30 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:border-neutral-700 hover:dark:bg-neutral-700"
          >
            Cancel
          </button>
        </div>
      </section>
    </template>
  </Dialog>
</template>
