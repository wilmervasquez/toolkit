<script lang="ts">
  import type { ChartData } from './chart';
  import type { Snippet } from "svelte";
  import * as d3 from 'd3';
  import { getPositionSvg } from "$modules/shared/utils/svg";
  import { getChartConfigContext, setChartDataContext, setChartScaleContext, setChartSvgContentContext, setChartSvgContext } from "$modules/shared/contexts/context";

  interface Props {
    data: ChartData[],
    tooltip: Snippet
    children: Snippet;
  }

  const { data, tooltip, children }: Props = $props();

  let width = $state(300)
  const height = 170

  const margin = {
    top: 2,
    left: 2,
    right: 2,
    bottom: 25,
  }

  const chart = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  }

  const values: number[] = []
  const config = getChartConfigContext()

  for (const key in config) {
    for (const dt of data) values.push(+dt[key])
  }

  const max = d3.max(values) ?? 0
  const min = 0

  const x = d3.scaleLinear([0, data.length], [0, chart.width])
  const y = d3.scaleLinear([min, max + 10], [0, chart.height])

  setChartScaleContext({ x, y})
  setChartDataContext(data);
  setChartSvgContext(width, height, margin);
  setChartSvgContentContext(margin.left, margin.top, width - margin.left - margin.right, height - margin.top - margin.bottom)

  let position = $state({ x:0, y:0})
  let index = $state(0)
  let label = $state('')
  let hidden = $state(true);

  function onmousemove(this: SVGSVGElement,event: MouseEvent) {
    position = getPositionSvg(this, event)

    if (event.target instanceof HTMLElement) {
      const gf = event.target.closest('g.think-release')

      if (gf) {
        index = gf.getAttribute('data-index') ? +gf.getAttribute('data-index')! : 0
        label = gf.getAttribute('data-name') ? gf.getAttribute('data-name')! : ''
        hidden = false
      } else {
        hidden = true
      }
    }
  }

  function onmouseout() {
    hidden = true
    index = 0
  }
</script>
<div class="relative" bind:clientWidth={width}>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <svg {width} {height} viewBox="0 0 {width} {height}" {onmousemove} {onmouseout} class="cursor-default">
    {@render children()}
  </svg>
  {@render tooltip?.()}
</div>
<style>
</style>
