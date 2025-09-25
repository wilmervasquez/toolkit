<script lang="ts">
  import { getContext, type Snippet } from 'svelte';
  import { getTabsContext } from './Tabs.svelte';

  interface Props {
    value: string
    children: Snippet
  }

  const { value, children }: Props = $props();
  const tabs = getTabsContext()

</script>
<button onclick={() => tabs.value = value} class={["px-2 h-8 cursor-pointer", value == tabs.value && 'border rounded-lg shadow-xs shadow-zinc-900 border-zinc-700 bg-zinc-900']}>
  {@render children()}
</button>
<style>

</style>
