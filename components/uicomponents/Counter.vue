<script setup>
const { bg, fg } = useColors()

const launchDate = new Date('2024-02-22');
const timeSinceLaunch = ref({ totalHours: '00', minutes: '00', seconds: '00' });

const calculateTimeSinceLaunch = () => {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - launchDate.getTime();

  const totalHours = Math.floor(differenceInTime / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((differenceInTime / (1000 * 60)) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((differenceInTime / 1000) % 60).toString().padStart(2, '0');

  timeSinceLaunch.value = { totalHours, minutes, seconds };
};

onMounted(() => {
  calculateTimeSinceLaunch();
  setInterval(calculateTimeSinceLaunch, 1000);
});
</script>

<template>
  <div class="rounded-xl flex flex-col px-8 py-5 gap-y-2 relative" :style="{ backgroundColor: bg, color: fg }">
    <h4 class="text-3xl font-bold text-pretty">Time elapsed since deployment</h4>
    <div class="grid grid-cols-5 text-center">
      <div class="">
        <p class="text-6xl font-black">{{ String(timeSinceLaunch.totalHours).padStart(2, '0') }}</p>
        <p class="text-xl">hs</p>
      </div>
      <div class="flex justify-center items-start">
        <span class="text-6xl font-black">:</span>
      </div>
      <div class="">
        <p class="text-6xl font-black">{{ String(timeSinceLaunch.minutes).padStart(2, '0') }}</p>
        <p class="text-xl">min</p>
      </div>
      <div class="flex justify-center items-start">
        <span class="text-6xl font-black">:</span>
      </div>
      <div class="">
        <p class="text-6xl font-black">{{ String(timeSinceLaunch.seconds).padStart(2, '0') }}</p>
        <p class="text-xl">sec</p>
      </div>
    </div>
  </div>
</template>
