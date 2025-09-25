<script lang="ts">
  import type { WithChildrenOptional } from "$modules/shared/types/props";
    import { getSelectContext } from "./Select.svelte";

  interface Props extends WithChildrenOptional {
    placeholder?: string | undefined
    children?: any
  }

  let { placeholder, children, ...props }: Props = $props();

  const select = getSelectContext()
</script>
{#if select.snippet}
  {@render select.snippet()}
{:else}
  <div>
    {placeholder}{@render children?.()}
  </div>
{/if}
<style>

</style>
