<script setup>
import Dialog from 'primevue/dialog'

const { bg, fg} = useColors()

const {
  primaryPalette,
  accentPalette,
  integratedPalette,
  primaryPaletteString,
  accentPaletteString,
  integratedPaletteString
} = useGeneratedPalette(bg, fg)

const { copyToClipboard } = useClipboard()

const visible = ref(false)
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
        <div
          class="w-full grid grid-cols-1 2xl:grid-cols-3 place-content-center gap-x-24 gap-y-3 [&>h4]:font-semibold [&>h4]:text-sm [&>h4]:2xl:text-lg [&>h4]:text-gray-600 [&>h4]:dark:text-gray-300 [&>pre]:text-sm [&>pre]:2xl:text-normal [&>pre]:relative"
        >
          <h4>Primary Palette</h4>
          <h4>Accent Palette</h4>
          <h4>From Primary to Accent</h4>
          <pre>{{ primaryPaletteString }},
            <button 
              @click="() => copyToClipboard(primaryPaletteString)"
              class="absolute py-1 px-2 -top-2 -right-9 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 hover:dark:bg-neutral-700"
            >Copy</button>
          </pre>
          <pre>{{ accentPaletteString }},
            <button 
              @click="() => copyToClipboard(accentPaletteString)"
              class="absolute py-1 px-2 -top-2 -right-9 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 hover:dark:bg-neutral-700"
            >Copy</button>
          </pre>
          <pre>{{ integratedPaletteString }}
            <button 
              @click="() => copyToClipboard(integratedPaletteString)"
              class="absolute py-1 px-2 -top-2 -right-9 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 hover:dark:bg-neutral-700"
            >Copy</button>
          </pre>
        </div>
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
