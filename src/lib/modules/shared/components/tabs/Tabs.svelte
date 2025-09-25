<script module>
  class TabsStore {
    value = $state('')
    constructor(init: string) {
      this.value = init
    }
  }

  export function setTabsContext(init: string) {
    setContext('p', new TabsStore(init))
  }

  export function getTabsContext(): TabsStore {
    return getContext('p')
  }
</script>
<script lang="ts">
  import { getContext, setContext, type Snippet } from 'svelte';

  interface Props {
    value: string
    children: Snippet
  }

  const { value, children }: Props = $props();

  setTabsContext(value)
</script>
{@render children()}
<style>

</style>
