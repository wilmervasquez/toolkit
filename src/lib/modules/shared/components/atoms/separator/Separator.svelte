<script lang="ts">
    import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props();
</script>
<div class="flex items-center gap-3 py-2">
  <div class="h-[1px] bg-zinc-800 grow"></div>
  {@render children()}
  <div class="h-[1px] bg-zinc-800 grow"></div>
</div>
