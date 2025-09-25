<script lang="ts">
    import { IconSelector } from '@tabler/icons-svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    dropdown?: Snippet
    children: Snippet
  }

  const { dropdown, children }: Props = $props();

  let v = $state(false)

  function onclick() {
    v = !v
  }
</script>
<th class={['relative font-semibold text-sm']}>
  <button {onclick} class="flex items-center group justify-between gap-2 pl-3 pr-2 py-1.5 rounded-lg cursor-pointer hover:bg-zinc-800">
    {@render children()}
    <IconSelector class="size-4 group-hover:text-zinc-400 text-transparent"/>
  </button>
  <div class="dp flex flex-col {!v && 'hidden'} absolute border border-neutral-800 right-0 p-1 rounded-lg bg-neutral-900">
    {@render dropdown?.()}
  </div>
</th>
<style>
  .dp {
    top: calc(100% + 4px);
  }
</style>
