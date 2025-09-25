<script lang="ts">
  import { type Snippet } from 'svelte';
  import { getTabsContext } from './Tabs.svelte';

  interface Props {
    value: string
    children: Snippet
  }

  const { value, children }: Props = $props();

  const tabs = getTabsContext()

  console.log(tabs.value == value);
  console.log(tabs.value,value);
</script>
{#if tabs.value == value}
  {@render children()}
{/if}
<style>

</style>
