<script lang="ts">
  export interface Props {
    id: string,
  }

  const { id }: Props = $props();
</script>
<pattern {id} patternUnits="userSpaceOnUse" width="5" height="5">
  <line x1="0" y1="0" x2="5" y2="5" stroke="gray" stroke-width="1"></line>
</pattern>

