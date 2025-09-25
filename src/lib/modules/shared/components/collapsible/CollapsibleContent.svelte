<script lang="ts">
  import type { Snippet } from 'svelte';
    import { getCollapsibleContext } from './Collapsible.svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();

  const collapsible = getCollapsibleContext()
</script>
{#if collapsible.opened}
  <div>{@render children()}</div>
{/if}
<style>

</style>
