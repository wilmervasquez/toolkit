<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    row?: boolean | undefined
    children: Snippet
  }

  const { row, children, ...props }: Props = $props();
</script>
<td class="p-2 text-sm">
  <div class={['flex', row == undefined ? 'flex-col':'items-center ', props.class]}>
    {@render children()}
  </div>
</td>
<style>

</style>
