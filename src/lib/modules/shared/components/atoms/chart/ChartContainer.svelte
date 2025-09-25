<script module>

  export type ChartData = Record<string, number | string>


  </script>
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { setChartConfigContext, type ChartConfig } from "$modules/shared/contexts/context";

  interface Props {
    config: ChartConfig;
    class: ClassValue
    children: Snippet;
  }

  const { config, children, ...props}: Props = $props();
  setChartConfigContext(config);
</script>
<div class={['relative', props.class]}>
  {@render children()}
</div>
<style>

</style>
