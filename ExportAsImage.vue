<script setup>
import { useColors } from '~/composables/useColors.ts'
import { useGeneratedPalette } from '~/composables/useGeneratedPalette.ts'

const { bg, fg } = useColors()

const {
  primaryPalette,
  accentPalette,
  integratedPalette,
  primaryPaletteString,
  accentPaletteString,
  integratedPaletteString
} = useGeneratedPalette(bg, fg)

</script>
<template>

</template>
