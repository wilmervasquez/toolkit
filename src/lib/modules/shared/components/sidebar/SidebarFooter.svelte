<script lang="ts">
  import { getUserContext } from '$modules/users/contexts/user.svelte';
  import { IconSelector } from '@tabler/icons-svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props();

  const user = getUserContext();
</script>
<div class="relative group m-3">
  <div class="mix flex items-center justify-between inset-shadow-xs inset-shadow-zinc-800 cursor-pointer gap-2 bg-zinc-900/50 hover:bg-zinc-900 px-2 h-13 rounded-xl border border-zinc-800">
    <div class="flex gap-3 items-center">
      <img src={user.avatarUrl} alt="" class="size-8 rounded-full">
      <div class="">
        <h3>{user.name}<span class="ml-0.5 px-2 bg-blue-500 rounded-full text-sm">Free</span></h3>
        <p class="text-xs text-zinc-500">{user.email}</p>
      </div>
    </div>
    <IconSelector/>
  </div>
  <div class="absolute hidden group-hover:block bottom-full border rounded-lg p-1 border-zinc-800 bg-zinc-900 left-0 right-0">
    {@render children()}
  </div>
</div>
<style>

</style>
