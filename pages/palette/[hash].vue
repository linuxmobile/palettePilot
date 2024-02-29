<script setup lang="ts">
import { stripError } from '~/utils/errors'
import SelectButton from 'primevue/selectbutton'

const route = useRoute();

// Actualiza para usar tanto la imagen como los colores devueltos por la API
const { data: imageData } = await useAsyncData('imageData', async () => {
  return await $fetch(`/api/palettes/${route.params.hash}`);
});

defineOgImageComponent(
  'Palette',
  {
    title: imageData.value.imageUrl,
  }
)

const { setImageSrc } = useImage()
const { setImageColors } = useColors()
const isLoading = ref(true)
const errorMsg = ref('')

onMounted(async () => {
  const hash = route.params.hash;
  if (!hash) {
    isLoading.value = false;
    errorMsg.value = 'No palette specified.';
    return;
  }

  try {
    // Ya que los colores vienen con la respuesta, no es necesario extraerlos de nuevo
    if (imageData.value?.colors) {
      setImageColors(imageData.value.colors); // Usa los colores directamente de la respuesta
    }
    if (imageData.value?.imageUrl) {
      setImageSrc(imageData.value.imageUrl); // Usa la URL de la imagen directamente de la respuesta
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = stripError(error);
    }
  } finally {
    isLoading.value = false;
  }
});

const DEMO = {
  LANDING_EXAMPLE: 'Minimalist Example',
  UI_ELEMENTS: 'UI Elements'
}
const OPTIONS = [DEMO.LANDING_EXAMPLE, DEMO.UI_ELEMENTS]
const selectedOption = ref(DEMO.LANDING_EXAMPLE)

</script>
<template>
  <div
    role="alert"
    aria-live="polite"
    v-if="isLoading"
    class="grid min-h-screen place-content-center py-12 md:py-0"
  >
    <p class="font-bold text-4xl animate-bounce text-center text-white">
      Loading Palette <span class="text-purple-600">Pilot</span>...
    </p>
  </div>
  <section v-else class="grid grid-cols-1 lg:grid-cols-12 py-12 md:py-0">
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
            'text-gray-700 dark:text-gray-400 focus:text-purple-600 focus:font-bold focus:underline underline-offset-2 hover:bg-gray-100 dark:focus:text-purple-400 dark:hover:bg-neutral-900 bg-gray-50 dark:bg-neutral-800 before:bg-transparent min-w-[172px]'
        }"
      />
      <MinimalistExample v-if="selectedOption === DEMO.LANDING_EXAMPLE" />
      <UIComponents v-else />
    </div>
  </section>
</template>

