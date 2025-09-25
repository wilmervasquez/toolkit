<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<ul class="flex flex-col gap-0.5 border-l border-zinc-700 ml-4 pl-3 my-1">
  {@render children()}
</ul>
<style>

</style>
