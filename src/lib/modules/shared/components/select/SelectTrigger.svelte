<script lang="ts">
  import type { WithChildren } from "$modules/shared/types/props";
  import { IconSelector } from "@tabler/icons-svelte";
  import { getSelectContext } from "./Select.svelte";

  interface Props extends WithChildren { }

  let { children, ...props }: Props  = $props();

  let select = getSelectContext();

  const onclick = () => {
    select.opened ? select.close() : select.open()
  }
</script>
<button {onclick} class="flex items-center justify-between gap-2 text-sm cursor-pointer group h-8 pl-3 border-zinc-700 shadow-sm bg-zinc-800 shadow-black/45 rounded-lg p-1">
  {@render children()}
  <IconSelector class="size-4 group-hover:text-zinc-400 text-zinc-600"/>
</button>
<style>

</style>
