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
    if (!getContext('sidebar')) {
      alert('----------')
    }
    return getContext('sidebar')
  }
</script>
<script lang="ts">
  import { getContext, setContext, type Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();

  let sidebar = getSidebarContext()
  console.log(sidebar,'0000000000000000');

</script>
<nav class={['sidebar grid grid-cols-1 content-between xbg-white xdark:bg-[#1E1E23] overflow-hidden h-full', sidebar.opened ? 'opened' : 'closed']}>
  {@render children()}
</nav>
<style>
  .sidebar {
    grid-template-rows: auto 1fr auto;
  }
  .opened {
    transform: translateX(0%);
  }
  .closed {
    transform: translateX(-100%);
    transition: 0.5s ease-out left;
  }
</style>
