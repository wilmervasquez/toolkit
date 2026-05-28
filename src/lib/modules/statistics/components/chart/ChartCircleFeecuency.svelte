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
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: getFrecuencies(values).map(({value, count}) => ({ value: count, name: value})),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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
