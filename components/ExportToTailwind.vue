<script setup>
import chroma from 'chroma-js'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import { useColors } from '~/composables/useColors.ts'

const toast = useToast()
const { bg, fg, primaryColor, accentColor } = useColors()

function generateColorScale(baseColorHex, prefix) {
  const scale = chroma
    .scale([
      chroma(baseColorHex).brighten(2.0),
      baseColorHex,
      chroma(baseColorHex).darken(3.5)
    ])
    .mode('lab')
    .colors(11)

  const colorObject = scale.reduce((acc, color, index) => {
    const baseLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    acc[baseLevels[index]] = color
    return acc
  }, {})

  return {
    [prefix]: colorObject
  }
}

const lighterColor = computed(() => {
  const primary = primaryColor.value
    ? chroma(primaryColor.value.hex)
    : chroma('#FFFFFF')
  const accent = accentColor.value
    ? chroma(accentColor.value.hex)
    : chroma('#000000')
  return primary.luminance() > accent.luminance() ? accent.hex() : primary.hex()
})

const darkerColor = computed(() => {
  const primary = primaryColor.value
    ? chroma(primaryColor.value.hex)
    : chroma('#FFFFFF')
  const accent = accentColor.value
    ? chroma(accentColor.value.hex)
    : chroma('#000000')
  return primary.luminance() <= accent.luminance()
    ? accent.hex()
    : primary.hex()
})

function generateIntegratedColorScale() {
  const primary = primaryColor.value
    ? chroma(primaryColor.value.hex)
    : chroma('#FFFFFF')
  const accent = accentColor.value
    ? chroma(accentColor.value.hex)
    : chroma('#000000')

  const startColor = primary.luminance() > accent.luminance() ? primary : accent
  const endColor = primary.luminance() <= accent.luminance() ? primary : accent

  const scale = chroma.scale([startColor, endColor]).mode('lab').colors(11)

  const colorObject = scale.reduce((acc, color, index) => {
    const baseLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    acc[baseLevels[index]] = color
    return acc
  }, {})

  return {
    integrated: colorObject
  }
}

const integratedPalette = computed(() => generateIntegratedColorScale())
const primaryPalette = computed(() => generateColorScale(bg.value, 'primary'))
const accentPalette = computed(() => generateColorScale(fg.value, 'accent'))

const visible = useState('modalVisible', () => false)

function paletteToString(palette) {
  const paletteObject = palette.value
  const paletteEntries = Object.entries(paletteObject)[0]
  const paletteName = paletteEntries[0]
  const colors = paletteEntries[1]

  let paletteStr = `"${paletteName}": {\n`
  Object.entries(colors).forEach(([level, color]) => {
    paletteStr += `    "${level}": "${color}",\n`
  })
  paletteStr = paletteStr.slice(0, -2) + '\n  }'

  return paletteStr
}

const primaryPaletteString = computed(() => paletteToString(primaryPalette))
const accentPaletteString = computed(() => paletteToString(accentPalette))
const integratedPaletteString = computed(() =>
  paletteToString(integratedPalette)
)

const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text)
    toast.add({
      severity: 'success',
      summary: 'Copied to Clipboard',
      group: 'bl',
      life: 2000
    })
  } catch (err) {
    console.error('Error al copiar texto:', err)
  }
}
</script>
<template>
  <button
    @click="visible = true"
    class="w-full rounded-md py-3 bg-gray-100 text-gray-500 dark:text-gray-400 dark:bg-neutral-900"
  >
    Export
  </button>
  <Dialog
    v-model:visible="visible"
    modal
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
          class="w-full border-b border-gray-500 font-semibold text-xl text-white"
        >
          <h3>Export Code</h3>
        </header>
        <div
          class="w-full grid grid-cols-3 place-content-center gap-x-24 gap-y-3 [&>h4]:font-semibold [&>h4]:text-sm [&>h4]:2xl:text-lg [&>h4]:text-white [&>pre]:text-sm [&>pre]:2xl:text-normal"
        >
          <h4>Primary Palette</h4>
          <h4>Accent Palette</h4>
          <h4>From Primary to Accent</h4>
          <pre>{{ primaryPaletteString }},</pre>
          <pre>{{ accentPaletteString }},</pre>
          <pre>{{ integratedPaletteString }}</pre>
        </div>
        <footer class="flex flex-col gap-4 w-full">
          <div class="flex flex-col gap-1">
            <h5 class="font-bold text-white text-sm">Primary</h5>
            <div class="flex">
              <button
                v-for="key in Object.keys(primaryPalette.primary)"
                :key="primaryPalette.primary[key]"
                v-tooltip.top="`${key}: ${primaryPalette.primary[key]}`"
                class="aspect-square w-full md:h-10 2xl:h-auto"
                :style="{ backgroundColor: primaryPalette.primary[key] }"
                @click="() => copyToClipboard(primaryPalette.primary[key])"
              >
                <span class="sr-only">
                  Copy hex color {{ primaryPalette.primary[key] }} to clipboard
                </span>
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h5 class="font-bold text-white text-sm">Accent</h5>
            <div class="flex">
              <button
                v-for="key in Object.keys(accentPalette.accent)"
                :key="accentPalette.accent[key]"
                v-tooltip.top="`${key}: ${accentPalette.accent[key]}`"
                class="aspect-square w-full md:h-10 2xl:h-auto"
                :style="{ backgroundColor: accentPalette.accent[key] }"
                @click="() => copyToClipboard(accentPalette.accent[key])"
              >
                <span class="sr-only">
                  Copy hex color {{ accentPalette.accent[key] }} to clipboard
                </span>
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h5 class="font-bold text-white text-sm">From Primary to Accent</h5>
            <div class="flex">
              <button
                v-for="key in Object.keys(integratedPalette.integrated)"
                :key="integratedPalette.integrated[key]"
                v-tooltip.top="`${key}: ${integratedPalette.integrated[key]}`"
                class="aspect-square w-full md:h-10 2xl:h-auto"
                :style="{ backgroundColor: integratedPalette.integrated[key] }"
                @click="
                  () => copyToClipboard(integratedPalette.integrated[key])
                "
              >
                <span class="sr-only">
                  Copy hex color {{ integratedPalette.integrated[key] }} to
                  clipboard
                </span>
              </button>
            </div>
          </div>
          <button
            @click="closeCallback"
            class="mt-4 p-1 2xl:p-3 w-full text-primary-50 border-1 border-white/30 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:border-neutral-700 hover:dark:bg-neutral-700"
          >
            Cancel
          </button>
        </footer>
      </section>
    </template>
  </Dialog>
</template>
