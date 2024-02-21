<script setup>
import MemberCard from '~/components/uicomponents/MemberCard.vue'
import GithubRepo from '~/components/uicomponents/GithubRepo.vue'
import ListenNow from '~/components/uicomponents/ListenNow.vue'
import AlertDialog from '~/components/uicomponents/AlertDialog.vue'
import WorkingCard from '~/components/uicomponents/WorkingCard.vue'
import ProjectCard from '~/components/uicomponents/ProjectCard.vue'
import PaymentCard from '~/components/uicomponents/PaymentCard.vue'
import MovieCard from '~/components/uicomponents/MovieCard.vue'
</script>
<template>
  <main
    class="pt-12 w-full h-full px-3 grid content-start grid-cols-9 gap-x-4 gap-y-3 select-none"
  >
    <section class="col-span-full lg:col-span-3 flex flex-col gap-y-3">
      <MemberCard />
      <AlertDialog />
      <PaymentCard />
      <MovieCard />
    </section>
    <section class="col-span-full lg:col-span-3 flex flex-col gap-y-3">
      <GithubRepo />
      <WorkingCard />
    </section>
    <section class="col-span-full lg:col-span-3 flex flex-col gap-y-3">
      <ListenNow />
      <ProjectCard />
    </section>
  </main>
</template>
