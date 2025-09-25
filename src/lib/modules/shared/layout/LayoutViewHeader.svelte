<script lang="ts">
  import { IconLayoutSidebarRight } from '@tabler/icons-svelte';
  import type { Snippet } from 'svelte';
  import { getSidebarContext } from '../components/sidebar/Sidebar.svelte';

  interface Props {
    left?: Snippet
    children: Snippet
  }

  let { left, children }: Props = $props();

  const sidebar = getSidebarContext()
</script>
<div class="flex items-center justify-between h-12">
  <div class="flex items-center">
    <button onclick={() => sidebar.open()} class="{sidebar.opened && 'hidden'} m-2 cursor-pointer text-zinc-400 inset-shadow-xs inset-shadow-zinc-600 p-2 rounded-lg bg-zinc-800">
      <IconLayoutSidebarRight/>
    </button>
    <div>{@render left?.()}</div>
  </div>
  <div>{@render children()}</div>
</div>
<style>

</style>
