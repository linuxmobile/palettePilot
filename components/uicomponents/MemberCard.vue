<script setup>
import { useColorSelection } from '~/composables/useColorSelection.ts'

const {accentColor, primaryColor} = useColorSelection()

const bg = computed(() => primaryColor.value ? primaryColor.value.hex : '#FFFFFF'); 
const fg = computed(() => accentColor.value ? accentColor.value.hex : '#000000'); 

const cardData = useState('cardData', () => ({
  avatar: 'https://ui.shadcn.com/avatars/01.png',
  userName: 'example',
  name: 'Sofia Davis',
  content: 'This is an example card component. We know, looks like twitter!'
}))

</script>
<template>
  <article class="border border-gray-600 rounded-xl px-8 py-5" :style="{backgroundColor: bg, color: fg}">
    <header class="flex items-start gap-x-3">
      <img :src="cardData.avatar" alt="Avatar" class="rounded-full size-14" />
      <div class="leading-none">
        <h2 class="font-bold text-lg">{{ cardData.name}}</h2>
        <p class="opacity-70">@{{cardData.userName}}</p>
      </div>
    </header>
    <main class="pt-4">
      <section>
        <p>{{cardData.content}}</p>
      </section>
    </main>
  </article>
</template>
