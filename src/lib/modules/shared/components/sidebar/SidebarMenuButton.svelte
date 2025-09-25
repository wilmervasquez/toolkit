<script module>
  class SidebarStore {
    opened = $state(true)
    open() {
      this.opened = true
    }
    close() {
      this.opened = false
    }
  }

  export function setSidebarContext() {
    return setContext('sidebar', new SidebarStore())
  }

  export function getSidebarContext(): SidebarStore {
    return getContext('sidebar')
  }

</script>
<script lang="ts">
  import { getContext, setContext, type Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
</script>
{@render children()}
<style>

</style>
