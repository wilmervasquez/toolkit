<script lang="ts">
    import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<div class="p-3">
  {@render children()}
</div>
<style>

</style>
