<script lang="ts">
    import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<div class="border dark:border-zinc-800 rounded-lg ">
  {@render children()}
</div>
<style>

</style>
