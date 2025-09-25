<script lang="ts">
  import type { Snippet } from 'svelte';
    import { getCollapsibleContext } from './Collapsible.svelte';
    import { IconChevronDown } from '@tabler/icons-svelte';
    import clsx from 'clsx';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();

  const collapsible = getCollapsibleContext()
</script>
<button onclick={() => collapsible.toggle()} class="w-full flex items-center justify-between h-9 gap-2 px-2 text-sm hover:bg-zinc-800 rounded-lg">
  <div class="flex gap-2">
    {@render children()}
  </div>
  <IconChevronDown class={clsx([collapsible.opened && 'rotate-180', 'transition-all duration-100 text-zinc-400'])}/>
</button>
<style>

</style>
