<script lang="ts">
  import type { KbdProps } from './typography';

  const { children }: KbdProps = $props();
</script>
<div class="text-zinc-500 border border-zinc-800 rounded-sm text-xs py-0.5 px-1 bg-zinc-950">{@render children()}</div>
<style>

</style>
