<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import * as d3 from 'd3';

  interface Props {
    x: number
    y: number
    width: number
    height: number
    lineCount?: number
  }

  const { x, y, width, height, lineCount = 5 }: Props = $props();

  let g: SVGGElement

  onMount(()=>{

    const yScale = d3.scaleLinear()
      .domain([0, lineCount - 1])
      .range([0, height]);

    d3.select(g)
      .selectAll('line')
      .data(d3.range(lineCount))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("y1", d => yScale(d))
      .attr("x2", width)
      .attr("y2", d => yScale(d))
      .attr("stroke", "#444")
      .attr("stroke-width", 0.5);
  })
</script>
<g bind:this={g} transform="translate({x},{y})"/>
<style>

</style>
