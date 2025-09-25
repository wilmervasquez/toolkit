<script lang="ts">
    import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<h2 class="text-lg font-semibold">
  {@render children()}
</h2>
<style>

</style>
