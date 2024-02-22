<script setup>
import { useColors } from '~/composables/useColors.ts'

const { bg, fg } = useColors()
const CARD_DATA = {
  avatar: 'https://ui.shadcn.com/avatars/01.png',
  userName: 'example',
  name: 'Sofia Davis',
  content: 'This is an example card component. We know, looks like twitter!'
}
</script>
<template>
  <article
    class="rounded-xl px-8 py-5 font-semibold"
    :style="{ backgroundColor: bg, color: fg }"
  >
    <header class="flex items-start gap-x-3">
      <img :src="CARD_DATA.avatar" alt="Avatar" class="rounded-full size-16" />
      <div class="leading-none">
        <h2 class="font-bold text-2xl">{{ CARD_DATA.name }}</h2>
        <p class="text-lg opacity-60">@{{ CARD_DATA.userName }}</p>
      </div>
    </header>
    <div class="pt-4">
      <section>
        <p class="text-lg opacity-70">{{ CARD_DATA.content }}</p>
      </section>
    </div>
  </article>
</template>
