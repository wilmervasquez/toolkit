<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<div class="flex p-1 mb-4 bg-zinc-800 rounded-xl inset-shadow-xs inset-shadow-zinc-500">
  {@render children()}
</div>
<style>

</style>
