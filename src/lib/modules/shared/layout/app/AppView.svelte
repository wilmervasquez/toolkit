<script lang="ts">
  import type { WithChildren } from '../../types/props';

  interface Props extends WithChildren { }

  let { children }: Props = $props();

</script>
<main class="grid grid-cols-1 grid-rows-1 items-start h-screen overflow-y-scroll">
  <div>{@render children()}</div>
</main>
<style>

</style>
