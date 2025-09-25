<script lang="ts">
  import type { WithChildren } from "$modules/shared/types/props";

  interface Props extends WithChildren { }

  let { children, ...props }: Props = $props();

</script>
<div>
  {@render children()}
</div>
<style>

</style>
