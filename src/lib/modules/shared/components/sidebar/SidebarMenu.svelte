<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();

</script>
<ul class="" data-component="SidebarMenu">
  {@render children()}
</ul>
<style>

</style>
