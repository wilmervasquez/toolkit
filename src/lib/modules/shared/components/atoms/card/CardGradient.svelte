<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<div
  class="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
>
  <div
    class="text-white rounded-3xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl duration-700 z-10 relative backdrop-blur-xl hover:border-white/25 overflow-hidden hover:shadow-white/5 hover:shadow-3xl"
  >
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
      ></div>

      <div
        style="animation-delay: 0.5s;"
        class="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"
      ></div>

      <div
        class="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-ping"
      ></div>
      <div
        style="animation-delay: 1s;"
        class="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping"
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"
      ></div>
    </div>

    <div class="p-8 relative z-10">
      <div class="flex flex-col items-center text-center">
        {@render children()}
        <div class="mt-6 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-0.5 transition-all duration-500 animate-pulse">
        </div>

        <div class="flex space-x-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div
            style="animation-delay: 0.1s;"
            class="w-2 h-2 bg-white rounded-full animate-bounce"
          ></div>
          <div
            style="animation-delay: 0.2s;"
            class="w-2 h-2 bg-white rounded-full animate-bounce"
          ></div>
        </div>
      </div>
    </div>

    <div class="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div class="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
</div>
