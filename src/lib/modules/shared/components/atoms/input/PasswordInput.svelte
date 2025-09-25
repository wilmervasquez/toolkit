<script>
  import { flex, tw } from "$lib/modules/shared/utils/tw";
  import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-svelte";

  let showPassword = $state(false);

  let { value = $bindable() } = $props()

  let IconEyeState = $derived(() => showPassword ? IconEyeOff : IconEye);
</script>
<div class={[flex.rowCenter, tw.border, tw.background, 'gap-2 p-3 rounded-xl text-zinc-400']}>
  <IconLock size={24}/>
  <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"  class="flex-1" autocomplete="new-password" bind:value>
  <button onclick={() => showPassword = !showPassword} class="cursor-pointer hover:text-zinc-300">
    <IconEyeState size={24}/>
  </button>
</div>
<style>

</style>
