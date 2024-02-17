<script setup>
import MemberCard from '~/components/uicomponents/MemberCard.vue'
import GithubRepo from '~/components/uicomponents/GithubRepo.vue'
</script>
<template>
  <main class="pt-12 w-full h-full px-3 grid content-start grid-cols-9 gap-x-4 gap-y-3">
    <section class="md:col-span-3">
      <MemberCard />
    </section>
    <section class="md:col-span-3">
      <GithubRepo />
    </section>
  </main>
</template>
