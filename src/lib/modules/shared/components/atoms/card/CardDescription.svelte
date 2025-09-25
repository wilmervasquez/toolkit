<script lang="ts">
    import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<p class="text-sm dark:text-zinc-500">
  {@render children()}
</p>
<style>

</style>
