<script lang="ts">
  import { IconLayoutSidebarRight } from '@tabler/icons-svelte';
  import { getSidebarContext } from './Sidebar.svelte';

  const sidebar = getSidebarContext()
</script>
<div class="flex items-center p-2 pl-3 justify-between text-purple-500 cursor-pointer">
  <a href="/" class="flex items-center gap-2">
    <img src="/favicon.svg" alt="" class="size-6">
    <h2 class="font-semibold text-lg">ToolKit</h2>
  </a>
  <button onclick={() => sidebar.close()} class="cursor-pointer text-zinc-400 inset-shadow-xs inset-shadow-zinc-800 p-1.5 rounded-lg bg-zinc-900">
    <IconLayoutSidebarRight/>
  </button>
</div>
<style>

</style>
