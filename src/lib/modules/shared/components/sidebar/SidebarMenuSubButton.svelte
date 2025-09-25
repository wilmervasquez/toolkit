<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<button class="px-2 h-8 flex items-center text-sm hover:bg-zinc-800 rounded-lg">
  {@render children()}
</button>
<style>

</style>
