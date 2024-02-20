<script setup>
import chroma from 'chroma-js'
import Dialog from 'primevue/dialog'
import { useColorSelection } from '~/composables/useColorSelection.ts'
import { useGlobalGenericState } from '~/utils/useGlobalGenericState'

const { accentColor, primaryColor } = useColorSelection()

const bg = computed(() =>
  primaryColor.value ? primaryColor.value.hex : '#FFFFFF'
)
const fg = computed(() =>
  accentColor.value ? accentColor.value.hex : '#000000'
)

function generateColorScale(baseColorHex, prefix) {
  let scale = chroma.scale([
    chroma(baseColorHex).brighten(2.0),
    baseColorHex,
    chroma(baseColorHex).darken(3.5)
  ]).mode('lab').colors(11);

  const colorObject = scale.reduce((acc, color, index) => {
    const baseLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    acc[baseLevels[index]] = color;
    return acc;
  }, {});

  return {
    [prefix]: colorObject
  };}

const primaryPalette = computed(() => generateColorScale(bg.value, 'primary'))
const accentPalette = computed(() => generateColorScale(fg.value, 'accent'))

const visible = useState('modalVisible', () => false)

function paletteToString(palette) {
  const paletteObject = palette.value;
  const paletteEntries = Object.entries(paletteObject)[0];
  const paletteName = paletteEntries[0];
  const colors = paletteEntries[1];

  let paletteStr = `"${paletteName}": {\n`;
  Object.entries(colors).forEach(([level, color]) => {
    paletteStr += `    "${level}": "${color}",\n`;
  });
  paletteStr = paletteStr.slice(0, -2) + "\n  }";

  return paletteStr;
}
const primaryPaletteString = computed(() => paletteToString(primaryPalette));
const accentPaletteString = computed(() => paletteToString(accentPalette));
</script>
<template>
  <button @click="visible = true" class="w-full rounded-md py-3 bg-gray-100 text-gray-500 dark:text-gray-400 dark:bg-neutral-900">Export</button>
  <Dialog
    v-model:visible="visible"
    modal
    :pt="{
      root: 'border-none bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-400',
      mask: {
        style: 'backdrop-filter: blur(2px)'
      }
    }"
  >
    <template #container="{closeCallback}">
      <section class="flex flex-col items-center justify-center gap-3 px-12 py-14">
        <header class="w-full border-b border-gray-500 font-semibold text-lg">Export Code</header>
        <div class="w-full grid grid-cols-2 place-content-center gap-x-24 gap-y-3 [&>h4]:font-semibold">
          <h4>Primary Palette</h4>
          <h4>Accent Palette</h4>
          <pre>{{ primaryPaletteString }},</pre>
          <pre>{{ accentPaletteString }},</pre>
        </div>
        <button @click="closeCallback" class="p-3 w-full text-primary-50 border-1 border-white/30 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:border-neutral-700 hover:dark:bg-neutral-700">Cancel</button>
      </section>
    </template>
  </Dialog>
</template>
