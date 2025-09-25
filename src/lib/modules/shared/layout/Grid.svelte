<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    class: ClassValue
    children: Snippet
  }

  const { children, ...props }: Props = $props();
</script>
<div class={['grid', props.class]}>
  {@render children()}
</div>
<style>

</style>
