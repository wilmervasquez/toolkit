<script lang="ts">
    import type { ToastStore } from "$modules/shared/contexts/toast.svelte";
    import { IconX } from "@tabler/icons-svelte";

    interface Props {
      store: ToastStore
    }

    const { store }: Props = $props();

</script>
<div class="toasts fixed right-3 bottom-3 flex flex-col gap-2">
  {#each store.toasts.slice(0,3) as {id, label, message, type, icon, color, duration} (id)}
    {@const Icon = icon}
    <div class="toast transition-all bg-white overflow-hidden dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-lg inset-shadow-xs inset-shadow-zinc-800">
      <div class={['flex justify-between gap-4 group/warning']}>
        <div class="flex items-center">
          <div class="p-4">
            {#if type == 'loading'}
              <svg width="20" height="20" class={color} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
            {:else}
              <Icon class={color}/>
            {/if}
          </div>
          <div class="flex flex-col text-sm">
            <h3 class={[color, 'font-bold lding']}>{ label }</h3>
            <p class="text-zinc-500">{message}</p>
          </div>
        </div>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button onclick={() => store.remove(id)} class="dark:hover:bg-zinc-800 rounded-sm hover:text-white p-1 m-1 self-start text-[#656D76]">
          <IconX size={16}/>
        </button>
      </div>
      <div class="h-0.5 time {color} bg-current" style:--duration="{duration}ms"></div>
    </div>
  {/each}
</div>
<style>
  .toast:nth-child(1) {
    translate: 0 0;
    scale: 1;
  }
  .toast:nth-child(2) {
    position: absolute;
    translate: 0 -30%;
    scale: 0.95;
    z-index: -1;
  }

  .toast:nth-child(3) {
    position: absolute;
    translate: 0 -50%;
    scale: 0.9;
    z-index: -2;
  }
  .time {
    animation: ltime var(--duration) linear;
  }

  .bcv {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
  .time {
    animation: ltime 20s linear;
  }

   .toasts:hover .toast {
    position: relative;
    scale: 1;
    translate: 0 0;
  }




  .lding::after {
    content: "...";
    animation: lgding 1s linear infinite;
  }

  @keyframes lgding {
    0% {
      content: ".";
    }
    50% {
      content: "..";
    }
    100% {
      content: "...";
    }
  }

  @keyframes ltime {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
</style>
