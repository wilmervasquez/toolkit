<script lang="ts">
  import type { Snippet, SvelteComponent } from 'svelte';
  import { page } from '$app/state';
    import type { IconsProps } from '@tabler/icons-svelte/icons/icons';

  interface Props {
    icon: typeof SvelteComponent<IconsProps>
    href: string
    match?: RegExp | string
    rigth?: Snippet
    children: Snippet
  }

  const { icon: Icon, href, match, rigth, children }: Props = $props();
  const twMenu = 'flex items-center gap-2 text-sm p-2 text-gray-300 hover:bg-zinc-800 rounded-lg cursor-pointer';

  let active = $derived(page.url.pathname == href)
  if (match) {
    active = new RegExp(match).test(page.url.pathname)
  }
</script>
<li class="list-none">
  <div class={[twMenu, active && 'bg-zinc-800 menu', 'relative justify-between h-9']}>
    <div class="flex items-center gap-2">
      <Icon class="size-5"/>
      {@render children()}
    </div>
    {@render rigth?.()}
  </div>
</li>
<style>
  .menu {
    box-shadow: 0 1px 4px rgb(59, 59, 59) inset;
  }
  .menu::before {
    content: " ";
    position: absolute;
    right: 0;
    width: 4px;
    background-color: var(--color-purple-500);
    box-shadow: -10px 0 20px var(--color-purple-500);
    height: 50%;
    border-radius: 10px;
  }
</style>
