<script lang="ts">
  import type { ClassValue } from "clsx";

  interface Props {
    orientation?: 'horizontal' | 'vertival'
    class?: ClassValue
  }

  const { orientation = 'horizontal', ...props }: Props = $props()
</script>
{#if orientation == 'horizontal'}
  <div class={["h-[1px] w-full bg-zinc-800", props.class]}></div>
{:else}
  <div class={["w-[1px] h-full bg-zinc-800", props.class]}></div>
{/if}
<style>

</style>
