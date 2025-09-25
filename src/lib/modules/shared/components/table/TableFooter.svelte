<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<div class="mix border border-zinc-800 rounded-2xl bg-zinc-800">
  <table>
    {@render children()}
  </table>
</div>
<style>
  .mix {
    box-shadow: 0 1px 4px var(--color-zinc-900) inset;
    /* border: 1px solid var(--color-zinc-700); */
  }
</style>
