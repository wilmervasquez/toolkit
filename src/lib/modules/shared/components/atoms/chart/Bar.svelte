<script lang="ts">
  import { getChartDataContext, getChartScaleContext, getChartSvgContentContext, getChartSvgContext } from "$modules/shared/contexts/context";

  interface Props {
    key: string;
  }

  const { key }: Props = $props();
  const content = getChartSvgContentContext();
  const data = getChartDataContext()
  const scale = getChartScaleContext()
  const svg = getChartSvgContext();
  const brand = { width: content.width / data.length }
</script>
<g transform="translate({content.x}, {content.y})">
  {#each data as dt, i}
    <rect
      x={scale.x(i) + brand.width / 2 /2}
      y={content.height - scale.y(dt[key])}
      width={brand.width / 2}
      height={scale.y(dt[key])}
      rx="6"
      fill="url(#line)"
      stroke="gray"
    />
  {/each}
</g>
<style>

</style>
