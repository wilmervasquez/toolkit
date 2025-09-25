<script module>
  class CollapsibleContext {
    opened = $state(false)
    open() { this.opened = true }
    close() { this.opened = false }
    toggle() { this.opened = !this.opened }
  }

  const key = Symbol()
  export function setCollapsibleContext() {
    setContext(key, new CollapsibleContext())
  }

  export function getCollapsibleContext(): CollapsibleContext {
    return getContext(key)
  }
</script>
<script lang="ts">
  import { getContext, setContext, type Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();

  setCollapsibleContext()
</script>
{@render children()}
<style>

</style>
