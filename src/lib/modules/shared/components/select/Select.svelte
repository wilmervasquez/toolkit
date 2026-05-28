<script module>
  class SelectContext {
    opened: boolean = $state(false)
    snippet?: Snippet = $state()
    value?: string = $state()
    constructor(valueInitial?: string) {
      this.value = valueInitial
    }
    open() { this.opened = true}
    close() { this.opened = false}
  }

  const key = Symbol();
  export function setSelectContext(valueInitial?: string) {
    return setContext(key, new SelectContext(valueInitial))
  }

  export function getSelectContext(): SelectContext {
    return getContext(key)
  }
</script>
<script lang="ts">
  import { onClickOutside } from "$modules/shared/utils/action";
  import { getContext, setContext, type Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    value?: string
    class?: ClassValue
    children: Snippet
  }

  let { value, children, ...props }: Props = $props();

  let select = setSelectContext(value)
  select.value = value

</script>
<div use:onClickOutside={{ onclick: () => select.close() }} class={['relative', props.class]}>
  {@render children()}
</div>
<style>

</style>
