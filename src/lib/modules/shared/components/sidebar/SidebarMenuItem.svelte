<script lang="ts">
  import type { Snippet, SvelteComponent } from 'svelte';
  import { page } from '$app/state';
    import type { IconsProps } from '@tabler/icons-svelte/icons/icons';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();
  const twMenu = 'flex items-center gap-2 text-sm p-2 text-gray-300 hover:bg-zinc-800 rounded-lg cursor-pointer';

</script>
<div class={''}>
  {@render children()}
</div>
<style>

</style>
