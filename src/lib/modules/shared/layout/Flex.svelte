<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    direction: 'row' | 'col'
    gap?: 0 | 1 | 2 | 3
    class?: ClassValue
    children: Snippet
  }

  const { direction, children, ...props }: Props = $props();
</script>
<div class={['flex', direction == 'col' && 'flex-col', props.class]}>
  {@render children()}
</div>
<style>

</style>
