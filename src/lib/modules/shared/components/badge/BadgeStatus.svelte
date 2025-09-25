<script lang="ts">
  import { flex } from "$lib/modules/shared/utils/tw";
  import { IconAlertCircle, IconBrandTelegram, IconCircleCheck, IconCircleX, IconClock } from "@tabler/icons-svelte";

  interface Props {
    variant: 'Pending' | 'Submitted' | 'Success' | 'Failed' | 'Expired';
  }

  const { variant }: Props = $props();

  const badge = {
    base: 'w-fit gap-2 text-sm rounded-2xl shadow-sm font-bold p-1 pr-4 mt-4',
    Pending: {
      colors: ' shadow-amber-200 bg-amber-200 text-amber-800 ',
      icon: IconAlertCircle
    },
    Submitted: {
      colors: 'shadow-blue-200 bg-blue-200 text-blue-800',
      icon: IconBrandTelegram
    },
    Success: {
      colors: 'shadow-green-200 bg-green-200 text-green-800',
      icon: IconCircleCheck
    },
    Failed: {
      colors: 'shadow-red-200 bg-red-200 text-red-800',
      icon: IconCircleX
    },
    Expired: {
      colors: 'shadow-gray-200 bg-gray-200 text-gray-800',
      icon: IconClock
    }
  }

  let Icon = badge[variant].icon;
</script>
<div class={[flex.rowCenter, badge.base, badge[variant].colors]}>
  <Icon size={16}/>
  { variant }
</div>
