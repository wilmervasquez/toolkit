<script lang="ts">
  import CartesianGrid from "$modules/shared/components/atoms/svg/CartesianGrid.svelte";
  import { getChartSvgContentContext } from "$modules/shared/contexts/context";

  interface Props {
    vertical?: boolean
    horizontal?: boolean
  }

  const { vertical }: Props = $props();

  let v = getChartSvgContentContext();
</script>
<CartesianGrid {...v} lineCount={5}/>
