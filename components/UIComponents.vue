<template>
  <div
    class="pt-12 w-full h-full px-3 pb-6 grid content-start grid-cols-8 2xl:grid-cols-9 gap-x-4 gap-y-3 select-none z-[1]"
  >
    <section class="col-span-full md:col-span-4 2xl:col-span-3 flex flex-col gap-y-3">
      <uicomponentsMemberCard />
      <uicomponentsAlertDialog />
      <uicomponentsPaymentCard />
      <uicomponentsMovieCard />
    </section>
    <section class="col-span-full md:col-span-4 2xl:col-span-3 flex flex-col gap-y-3">
      <uicomponentsGithubRepo />
      <uicomponentsWorkingCard />
      <uicomponentsCounter/>
    </section>
    <section class="col-span-full md:col-span-4 2xl:col-span-3 flex flex-col gap-y-3">
      <uicomponentsListenNow />
      <uicomponentsProjectCard />
      <uicomponentsScheduleCard/>
    </section>
  </div>
</template>
