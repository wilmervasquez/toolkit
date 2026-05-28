<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { ButtonLink } from '$modules/shared/components/button';
  import { setColorSchemeContext } from '$modules/shared/contexts/color-scheme';
  import { getUserContext } from '$modules/users/contexts/user.svelte';
  import { IconBrandDiscordFilled, IconBrandFacebookFilled, IconBrandInstagramFilled, IconBrandTelegram, IconBrandTiktokFilled, IconBrandYoutubeFilled, IconCashBanknote, IconChevronCompactRight, IconChevronDown, IconCornerDownLeft, IconDropletStar, IconFile, IconLayoutBoard, IconLink, IconLocationFilled, IconMoon, IconPill, IconTable, IconTriangle } from "@tabler/icons-svelte";
  import type { IconsProps } from '@tabler/icons-svelte/icons/icons';
  import type { SvelteComponent } from 'svelte';

  let { children } = $props();

  const user = getUserContext()
  const theme = setColorSchemeContext();
  let scrolled = $state(false)

  const onscroll = () => {
    scrolled = window.scrollY > 30
  }
</script>
<svelte:window {onscroll}/>
<svelte:head>
  <title>ToolKit</title>
</svelte:head>
{#snippet men(Icon: typeof SvelteComponent<IconsProps>, label: string, description: string, href: string)}
  <a href="/toolkit{href}" class="flex items-center gap-3 hover:bg-zinc-800 p-2 rounded-lg">
    <div class="">
      <div class="flex items-center gap-2 text-purple-500"><Icon/>{ label }</div>
      <p class="text-zinc-300 text-sm pl-7">{ description }</p>
    </div>
    <IconChevronCompactRight class="text-zinc-500"/>
  </a>
{/snippet}
<header class="max-w-6xl m-auto sticky top-0 rounded-full" class:scrolled>
  <nav class="p-4">
    <ul class="flex gap-3 items-center justify-between">
      <h1>
        <a href="/" class="flex gap-3 items-center text-purple-500 text-2xl font-bold">
          <img src={asset('/favicon.svg')} alt="" class="size-8" />
          ToolKit
        </a>
      </h1>
      <li class="flex">
        <a href="/"  class="flex items-center gap-2 hover:bg-purple-500/10 hover:text-purple-400 px-3 py-1 rounded-lg group">
          Home
          <IconChevronDown class="size-4"/>
          <div class="mens -translate-y-1 invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 absolute border border-zinc-700 z-99 bg-zinc-800/70 backdrop-blur-2xl top-13 p-1 inset-shadow-sm rounded-xl shadow-black/50 shadow-sm">
            {@render men(IconPill, 'Dermatologia', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconDropletStar, 'Odontologia', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconLayoutBoard, 'Admision', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconCashBanknote, 'Capacidades', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconPill, 'Sorpresa', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconFile, 'Limitaciones', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconPill, 'Footer', 'Empeñanodos en crear una piel resueña','')}
          </div>
        </a>
        <a href="/" class="flex items-center gap-2 group hover:bg-purple-500/10 hover:text-purple-400 px-3 py-1 rounded-lg">
          Tools
          <IconChevronDown class="size-4"/>
          <div class="mens -translate-y-1 invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 absolute border border-zinc-700 z-99 bg-zinc-800/70 backdrop-blur-2xl top-13 p-1 inset-shadow-sm rounded-xl shadow-black/50 shadow-sm">
            {@render men(IconPill, 'Statistics', 'Empeñanodos en crear una piel resueña','/statistics')}
            {@render men(IconDropletStar, 'Translate', 'Empeñanodos en crear una piel resueña','/translate')}
            {@render men(IconTriangle, 'Geo', 'Empeñanodos en crear una piel resueña','/geo')}
            {@render men(IconTable, 'Tables', 'Insersecion de datos','/tables')}
          </div>
        </a>
        <a href="/"  class="flex items-center gap-2 hover:bg-purple-500/10 hover:text-purple-400 px-3 py-1 rounded-lg">Services</a>
        <a href="/metrics" class="flex items-center gap-2 hover:bg-purple-500/10 hover:text-purple-400 px-3 py-1 rounded-lg">Metrics</a>
        <a href="/test"  class="flex items-center gap-2 hover:bg-purple-500/10 hover:text-purple-400 px-3 py-1 rounded-lg group">
          Blog<IconChevronDown class="size-4"/>
          <div class="mens -translate-y-1 invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 absolute border border-purple-900 z-99 bg-zinc-900 top-13 p-1 inset-shadow-sm rounded-xl inset-shadow-zinc-800 shadow-black shadow-sm">
            {@render men(IconPill, 'Redes sociales', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconDropletStar, 'Implantes', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconLayoutBoard, 'Letreras', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconCashBanknote, 'Manecillas', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconPill, 'Sorpresa', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconFile, 'Limitaciones', 'Empeñanodos en crear una piel resueña','')}
            {@render men(IconPill, 'Cardiobasculars INterior', 'Empeñanodos en crear una piel resueña','')}
          </div>
        </a>
        <a href="/workspace"  class="flex items-center gap-2 hover:bg-purple-500/10 hover:text-purple-400 px-3 py-1 rounded-lg">Contact</a>
      </li>
      <li class="flex gap-3">
        {#if user.auth}
          <button onclick={() => theme.toggle()} class="text-zinc-200 grid place-items-center w-8 h-8 p-0.5  rounded-2xl bg-zinc-700 border border-zinc-600 inset-shadow-sm inset-shadow-zinc-500">
            {#if theme.isDark()}
              <IconMoon/>
            {/if}
          </button>
          <ButtonLink href={resolve('/statistics')} radius="full">
            Go starts
            <IconCornerDownLeft class="size-4"/>
          </ButtonLink>
        {:else}
          <ButtonLink href="/signin" variant="secondary" radius="full">Sign In</ButtonLink>
          <ButtonLink href="/signup" radius="full">Sign Up</ButtonLink>
        {/if}
      </li>
    </ul>
  </nav>
</header>
<div class="-z-10">
  {@render children()}
</div>
{#snippet lilink(href: string, label: string)}
  <li>
    <a {href} class="flex items-center gap-2 text-sm text-zinc-300 hover:underline hover:text-zinc-100 underline-offset-5 group">
      {label}
      <IconLink class="size-4 opacity-0 group-hover:opacity-100"/>
    </a>
  </li>
{/snippet}
{#snippet lilinkicon(Icon: typeof SvelteComponent<IconsProps>, href: string)}
  <li>
    <a {href} class="block bg-zinc-800 p-2 rounded-lg inset-shadow-2xs inset-shadow-zinc-700">
      <Icon/>
    </a>
  </li>
{/snippet}
<footer class="flex flex-wrap items-end gap-10 justify-center py-16 bg-zinc-900">
  <div class="">
    <div class="flex text-xl font-semibold gap-2">
      <img src="/favicon.svg" alt="" class="size-7">
      ToolKit
    </div>
    <p class="text-sm max-w-72 pt-3 text-zinc-300">Lorem ipsum, dololat minus modi maxime quisquam  unde ratione beatae, tempore et cupiditate ut nam dignissimos! Nulla?</p>
    <ul class="flex items-center gap-2 pt-3">
      {@render lilinkicon(IconBrandFacebookFilled, '')}
      {@render lilinkicon(IconBrandYoutubeFilled, '')}
      {@render lilinkicon(IconBrandInstagramFilled, '')}
      {@render lilinkicon(IconBrandTiktokFilled, '')}
      {@render lilinkicon(IconBrandTelegram, '')}
      {@render lilinkicon(IconBrandDiscordFilled, '')}
    </ul>
    <p class="text-xs pt-3 text-zinc-600">Copyright © 2025 ToolKit, All rights reserved.</p>
  </div>
  <div class="flex gap-10 pb-5">
    <div class="">
      <h4 class="text-purple-400">Marketplace</h4>
      <ul class="flex flex-col gap-2 pt-3">
        {@render lilink('', 'Explore')}
        {@render lilink('', 'Item detail')}
        {@render lilink('', 'Live Audition')}
      </ul>
    </div>
    <div class="">
      <h4 class="text-purple-400">Stats</h4>
      <ul class="flex flex-col gap-2 pt-3">
        {@render lilink('', 'Ranking')}
        {@render lilink('', 'Activity')}
        {@render lilink('', 'Autor')}
      </ul>
    </div>
    <div class="">
      <h4 class="text-purple-400">Resource</h4>
      <ul class="flex flex-col gap-2 pt-3">
        {@render lilink('', 'Blogs')}
        {@render lilink('', 'Help and Center')}
        {@render lilink('', 'FAQs')}
      </ul>
    </div>
    <div class="">
      <h4 class="text-purple-400">My&nbsp;account</h4>
      <ul class="flex flex-col gap-2 pt-3">
        {@render lilink('', 'Profile')}
        {@render lilink('', 'My Wallet')}
        {@render lilink('/signin', 'SIgn In')}
        {@render lilink('/signup', 'Sign Up')}
      </ul>
    </div>
    <div class="">
      <h4 class="text-purple-400">Subscribe Us</h4>
      <ul class="flex flex-col gap-2 pt-3">
        <li class="text-sm text-zinc-300 max-w-72">Sign for our newsletter to get the latest news in your inbox</li>
        <li class="border border-zinc-700 p-1 mt-3 flex max-w-fit rounded-xl pl-3">
          <input type="text" placeholder="you@xyz.com">
          <div class="p-2 bg-purple-500 rounded-lg">
            <IconLocationFilled class="size-4"/>
          </div>
        </li>
        <li><a href="/test" class="text-sm text-zinc-900 hover:text-zinc-400 underline underline-offset-5">Test</a></li>
      </ul>
    </div>
  </div>
</footer>
<style>
  header {
     transition: .7s ease;
  }

  header.scrolled {
    top: 8px;
    background: linear-gradient(90deg, oklch(20.463% 0.00002 271.152), oklch(20.463% 0.00002 271.152 / 0.5), oklch(20.463% 0.00002 271.152));
    box-shadow: 0 1px 5px var(--color-zinc-700) inset, 0 1px 5px var(--color-zinc-900);
    backdrop-filter: blur(10px);
  }
  .mens {
    transition: translate .5s linear, visibility 1s, opacity .2s linear;
  }
</style>
