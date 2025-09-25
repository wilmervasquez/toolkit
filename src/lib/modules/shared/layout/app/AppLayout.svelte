<script lang="ts">
  import type { Snippet } from 'svelte';

  import { setColorSchemeContext } from '$lib/modules/shared/contexts/color-scheme';
  import { setToastStore } from "$modules/shared/contexts/toast.svelte";
  import { setSidebarContext } from '../../components/sidebar/Sidebar.svelte';

  import Toast from '../../components/toast/Toast.svelte';

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props();

  setColorSchemeContext()
  const sidebar = setSidebarContext()
  const toastStore = setToastStore();
</script>
<div class="layout {sidebar.opened && 'opened'} w-screen h-svh overflow-hidden grid bg-background">
  {@render children()}
</div>
<!-- Toasts -->
<Toast store={toastStore}/>
<style>
  .layout {
    grid-template-columns: 1fr;
  }

  @media (min-width: 900px) {
    .layout.opened {
      grid-template-columns: 255px 1fr;
    }
    .layout {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
    }
  }

</style>
