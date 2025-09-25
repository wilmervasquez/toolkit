<script lang="ts">
  import Card from "$modules/shared/components/atoms/card/Card.svelte";
  import CardContent from "$modules/shared/components/atoms/card/CardContent.svelte";
  import CardDescription from "$modules/shared/components/atoms/card/CardDescription.svelte";
  import CardHeader from "$modules/shared/components/atoms/card/CardHeader.svelte";
  import CardTitle from "$modules/shared/components/atoms/card/CardTitle.svelte";
  import BarChart from "$modules/shared/components/molecules/chart/BarChart.svelte";
  import ChartContainer from "$modules/shared/components/atoms/chart/ChartContainer.svelte";
  import Pattern from "$modules/shared/components/atoms/svg/Pattern.svelte";
  import CartesianGrid from "$modules/shared/components/molecules/chart/CartesianGrid.svelte";
  import ChartTooltip from "./ChartTooltip.svelte";
  import XAxis from "$modules/shared/components/atoms/chart/XAxis.svelte";
  import Bar from "$modules/shared/components/atoms/chart/Bar.svelte";

  interface ChartData {
    visits: Array<{
      method: string;
      visits: number;
    }>;
  }

  interface Props {
    data: ChartData[]
  }

  const { data }: Props = $props();

  const config = {
    visits: {
      label: 'Visits',
      color: '#4A90E2',
    }
  };
</script>
<Card>
  <CardHeader>
    <CardTitle>Visitas</CardTitle>
    <CardDescription>Visitas realizadas por el paciente</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer {config} class={['min-h-[170px]', 'h-full']}>
      <BarChart {data}>
        <defs>
          <Pattern id="line"/>
        </defs>
        <CartesianGrid/>
        <Bar key="visits"/>
        <XAxis key="method"/>
        @{#snippet tooltip()}
          <ChartTooltip/>
        {/snippet}
      </BarChart>
    </ChartContainer>
  </CardContent>
</Card>
<style>

</style>
