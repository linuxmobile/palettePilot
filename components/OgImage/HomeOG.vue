<script setup lang="ts"></script>

<template>
  <div
    class="h-full w-full flex items-center justify-center bg-black text-white relative"
  >
    <div class="w-full h-full absolute">
      <svg height="100%" width="100%">
        <defs>
          <linearGradient id="0" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stop-color="#6fe3e1" />
            <stop offset="100%" stop-color="#5257e5" />
          </linearGradient>
        </defs>
        <rect fill="url(#0)" height="100%" width="100%" />
      </svg>
    </div>
    <div class="w-full h-full absolute">
      <img
        src="/diagonal-black.png"
        class="w-3xl absolute -right-30 top-30 rounded-lg"
      />
    </div>
    <div class="flex items-start justify-center h-full pl-10">
      <div
        class="flex flex-col items-start justify-center w-full h-full leading-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="size-34"
        >
          <path
            fill="currentColor"
            d="M17.9 22a4 4 0 1 0 0-8h-.22l-5.802 5.798a1.224 1.224 0 0 0-.378.883c0 .713.577 1.319 1.29 1.319zM13.284 4.959l-1.055 1.055a2.5 2.5 0 0 0-.729 1.76v8.238c0 1.055 0 1.582.313 1.708c.314.126.679-.255 1.409-1.016l5.838-6.09a4.042 4.042 0 0 0-5.776-5.655"
          ></path>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10 6v12a4 4 0 0 1-8 0V6a4 4 0 1 1 8 0M6 19a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
            clipRule="evenodd"
          ></path>
        </svg>
        <h1 class="text-[80px] font-black text-left">Palette Pilot</h1>
        <p class="text-2xl font-bold">Awesome Color Palette for you UI</p>
      </div>
    </div>
  </div>
</template>
