<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue
    children: Snippet
  }

  let { children, ...props }: Props = $props();

</script>
<div class={[props.class]}>
  {@render children()}
</div>
<style>

</style>
