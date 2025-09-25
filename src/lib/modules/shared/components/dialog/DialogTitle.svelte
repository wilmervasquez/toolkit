<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
<h2 class="font-bold text-lg">{@render children()}</h2>
<style>

</style>
