<script lang="ts">
  import { IconCheck } from "@tabler/icons-svelte";
  import { getSelectContext } from "./Select.svelte";

  interface Props {
    value: string
    children: any
  }

  let { value, children, ...props }: Props = $props();

  const select = getSelectContext()

  function onclick() {
    select.snippet = children
    select.close()
    select.value = value
  }
</script>
<button {onclick} class="flex items-center w-full gap-2 pr-6 pl-2 font-normal text-zinc-300 h-7.5 text-nowrap hover:bg-zinc-800 cursor-pointer rounded-sm text-sm">
  <IconCheck class="size-4 {select.value == value ? 'text-zinc-400' : 'text-transparent'}"/>
  {@render children()}
</button>
<style>

</style>
