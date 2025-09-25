<script>
  import { flex, tw } from "$lib/modules/shared/utils/tw";
  import { IconMail } from "@tabler/icons-svelte";

  let { value = $bindable() } = $props();
  let focus = $state(false);

</script>
<div class={[flex.rowCenter, tw.background, focus ? 'border-purple-600 border' : tw.border, 'gap-2 p-3 rounded-xl text-zinc-400']}>
  <IconMail size={24}/>
  <input
    type="email"
    name="email"
    placeholder="Correo Electronico"
    class="flex-1"
    onfocus={() => focus = true}
    onblur={() => focus = false}
    autocomplete="email"
    bind:value/>
</div>
<style>

</style>
