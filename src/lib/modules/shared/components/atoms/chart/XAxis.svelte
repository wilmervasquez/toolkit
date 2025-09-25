<script lang="ts">
    import { getChartDataContext, getChartScaleContext, getChartSvgContentContext, getChartSvgContext } from "$modules/shared/contexts/context";

  interface Props {
    key: string;
  }

  const { key }: Props = $props();
  const scale = getChartScaleContext()
  const svg = getChartSvgContext();
  const data = getChartDataContext();
  const content = getChartSvgContentContext();
  const brand = { width: content.width / data.length }
</script>
<g transform="translate({svg.margin.left}, {svg.height - svg.margin.bottom + 8})">
  {#each data as dt, i}
    <text x={scale.x(i) + brand.width / 2 } y={0} text-anchor="middle" alignment-baseline="text-before-edge" class="fill-zinc-400 text-xs">{dt[key]}</text>
  {/each}
</g>
<style>

</style>
