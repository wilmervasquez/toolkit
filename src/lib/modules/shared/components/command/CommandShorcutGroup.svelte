<script lang="ts">
  import type { CommandShortcutProps } from './command';

  const { children }: CommandShortcutProps = $props();
</script>
<div class="flex gap-1">{@render children()}</div>
<style>

</style>
