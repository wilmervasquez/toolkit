<script lang="ts">
  import '../app.css';

  import { navigating } from '$app/state';
  import { setUserContext } from '$modules/users/contexts/user.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  setUserContext()

  let statusLoad: boolean = $state(false);

  onMount(() => {
    setTimeout(() => {
      statusLoad = false;
    }, 1000);
  });

</script>
{@render children()}
{#if statusLoad}
  <div class={["grid place-items-center transition-all text-purple-500 w-screen h-screen bg-radial-[at_50%_50%] from-zinc-950 via-stone-950 to-zinc-950 to-90% fixed inset-0"]}>
    <div class="flex items-center gap-3 flex-col text-xl">
      <div class="flex flex-col items-start">
        <div class="relative mb-6">
          <div class="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
          <div style="animation-delay: 0.5s;" class="absolute inset-0 rounded-full border border-white/10 animate-pulse"></div>
          <div class="p-6 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-white/20">
            <div class="transform group-hover:rotate-180 transition-transform duration-700">
              <img src="/favicon.svg" alt="" class="size-12">
            </div>
          </div>
        </div>
      </div>
      <p class="font-fuzzy text-4xl font-bold bg-gradient-to-r from-sky-300 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
        Hello Diego
      </p>
      <p class="font-fuzzy max-w-96 text-base text-center bg-gradient-to-r from-white via-zinc-500 to-white bg-clip-text text-transparent animate-pulse">
        Lorem ipsum dolor sit, amet consectetur adrporis aperiam illo ipsa, quam a cumque quia
      </p>
      <p class="bg-zinc-900 border border-zinc-800 text-sm px-3 py-1 rounded-4xl text-center ">
        <span class="bg-gradient-to-r from-white via-zinc-500 to-white bg-clip-text text-transparent">Software developing</span>
      </p>
    </div>
  </div>
{/if}
<!-- Barra de loading -->
<div class={['fixed top-0 left-0 right-0 overflow-hidden']}>
  <div class={['h-0.5 w-0 bg-primary rounded-full', navigating.to && 'loading' ]}></div>
</div>
<style>
  @keyframes loading {
    to {
      width: 100%;
      transform: translateX(100%);
    }
  }
  @keyframes loading-end {
    0% {
      width: 0%;
      transform: translateX(0%);
    }
    100% {
      width: 100%;
      transform: translateX(100%);
    }
  }
  .loading {
    animation: loading 1s linear infinite ;
  }

</style>
