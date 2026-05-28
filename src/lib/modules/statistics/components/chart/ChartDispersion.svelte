<script lang="ts">
  import * as echarts from "echarts";
  import { onDestroy, onMount } from "svelte";

  let chartDiv: HTMLDivElement;
  let chart: echarts.ECharts;

  interface Props {
    values: number[]
  }
  const { values }: Props = $props()

  function makeOption(values: number[]): echarts.EChartsOption {
    const scatterData = values.map(v => [v, 0]);
    return {
      grid: {
        left:20,
        right: 20
      },
      backgroundColor: "transparent",
      xAxis: {
        type: "value",
        name: "",
        nameTextStyle: { color: "#ccc" },
        axisLabel: { color: "#ccc" }
      },
      yAxis: { type: "value", show: false },
      series: [
        {
          type: "scatter",
          symbolSize: 12,
          itemStyle: { color: "#10b981" },
          data: scatterData
        }
      ]
    };

  }

  export function updateValues(values: number[]) {
    chart.setOption(makeOption(values));
  }

  onMount(() => {
    chart = echarts.init(chartDiv, "dark");
    chart.setOption(makeOption(values));
    window.addEventListener("resize", () => chart.resize());
  });

  onDestroy(() => chart.dispose());
</script>
<div bind:this={chartDiv} class="w-full h-[50px]"></div>
