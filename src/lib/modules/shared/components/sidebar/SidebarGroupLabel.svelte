<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<div class="text-sm px-2 pt-2 pb-1 text-zinc-400">
  {@render children()}
</div>
<style>

</style>
