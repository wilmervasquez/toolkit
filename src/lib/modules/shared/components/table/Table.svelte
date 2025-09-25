<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLTableAttributes } from 'svelte/elements';

  interface Props extends HTMLTableAttributes {
    children: Snippet
  }

  const { children, ...props }: Props = $props();
</script>
<div class="shadow-xs shadow-zinc-900 bg-zinc-900/20 order border-zinc-800 rounded-2xl p-2">
  <table class="w-full" {...props}>
    {@render children()}
  </table>
</div>
<style>

</style>
