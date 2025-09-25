<script module>
  class SelectContext {
    opened: boolean = $state(false)
    snippet?: Snippet = $state()
    value?: string = $state()
    open() { this.opened = true}
    close() { this.opened = false}
  }

  const key = Symbol();
  export function setSelectContext() {
    return setContext(key, new SelectContext())
  }

  export function getSelectContext(): SelectContext {
    return getContext(key)
  }
</script>
<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import { onClickOutside } from "$modules/shared/utils/action";
  import { getContext, setContext, type Snippet } from "svelte";

  interface Props {
    value?: string
    class?: ClassValue
    children: Snippet
  }

  let { value, children, ...props }: Props = $props();

  let select = setSelectContext()
  select.value = value

</script>
<div use:onClickOutside={{ onclick: () => select.close() }} class={['relative', props.class]}>
  {@render children()}
</div>
<style>

</style>
