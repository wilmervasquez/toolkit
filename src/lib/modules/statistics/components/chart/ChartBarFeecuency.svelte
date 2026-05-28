<script lang="ts">
  import * as d3 from 'd3';
  import * as echarts from "echarts";
  import { onDestroy, onMount } from "svelte";

  let chartDiv: HTMLDivElement;
  let chart: echarts.ECharts;

  interface Props {
    values: number[]
  }
  const { values }: Props = $props()

  function getFrecuencies(data: number[]) {
    return Array.from(
      d3.rollup(data, v => v.length, d => d), // Map<value, count>
      ([value, count]) => ({ value, count })  // lo convertimos a array de objetos
    );
  }

  function makeOption(values: number[]): echarts.EChartsOption {
    return {
      backgroundColor: 'transparent',
      title: {
        text: 'Edad',
        subtext: '(en años)',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: getFrecuencies(values).map(({value}) => value)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: getFrecuencies(values).map(({count}) => count),
          type: 'bar'
        }
      ]
    }
  }

  export function updateValues(values: number[]) {
    chart.setOption(makeOption(values));
  }

  onMount(() => {
    chart = echarts.init(chartDiv, "dar");
    chart.setOption(makeOption(values));
    window.addEventListener("resize", () => chart.resize());
  });

  onDestroy(() => chart.dispose());
</script>
<div bind:this={chartDiv} class="w-full h-[300px]"></div>
