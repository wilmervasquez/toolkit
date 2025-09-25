<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    gap?: 1 | 2 | 3
    direction?: 'row' | 'column'
    children: Snippet
  }

  const { direction, children }: Props = $props();
</script>
<div class={["flex", direction == 'column' && 'flex-col']}>
  {@render children()}
</div>
<style>

</style>
