<script setup lang="ts">
import { ref } from 'vue'
import { useColors } from '~/composables/useColors'

const isDialogOpen = ref(false)
const { bg, fg } = useColors()

const openDialog = () => {
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
}

// TODO: determine bg luminance in order to set an appropriate border color for the button
// TODO: determine bg luminance in order to set an appropriate neutral text color for alert dialog
// (using fg meanwhile)
// TODO: determine bg luminance in order to set an appropriate bg color for alert dialog's inner buttons
// and also, get the luminance of that bg color to select an appropriate text color
</script>

<template>
  <button
    class="text-sm font-semibold py-2 px-8 border border-zinc-700 rounded-md"
    @click="openDialog"
    :style="{ backgroundColor: bg, color: fg }"
  >
    Show alert dialog
  </button>
  <div
    v-if="isDialogOpen"
    role="alertdialog"
    aria-live="assertive"
    class="grid place-content-center fixed inset-0 bg-black/60 z-24"
  >
    <div
      class="flex flex-col gap-3 py-3 px-4 border border-zinc-600 rounded-md"
      :style="{ backgroundColor: bg }"
    >
      <p class="font-bold text-base lg:text-lg" :style="{ color: fg }">
        Are you sure?
      </p>
      <p class="text-xs lg:text-sm font-light" :style="{ color: fg }">
        This action is permanent, you won't be able to undo it.
      </p>
      <div class="flex flex-wrap items-center justify-end gap-3 mt-5">
        <button
          class="text-sm font-semibold py-2 px-8 border border-zinc-700 rounded-md"
          @click="closeDialog"
          :style="{ color: fg }"
        >
          Cancel
        </button>
        <button
          class="text-sm font-semibold py-2 px-8 border border-zinc-700 rounded-md"
          :style="{ backgroundColor: bg, color: fg }"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
