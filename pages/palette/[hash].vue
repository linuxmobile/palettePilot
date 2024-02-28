<script setup>
const route = useRoute()
const paletteHash = route.query.palette

</script>
<template>
  <h1>Palette: {{ paletteHash }}</h1>
</template>
