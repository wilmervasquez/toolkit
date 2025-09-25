<script lang="ts">

  interface Props {
    value: boolean
    onchange: Function
  }

  let { value, onchange }: Props = $props();

  const onclick = () => {
    value = !value
    onchange?.(value)
  }
</script>
<button {onclick} aria-label="." class={['w-9 h-5 bg-[#A0A9B4] rounded-2xl p-[2px] transition-all cursor-pointer', value && 'bg-zinc-900']}>
  <div class={['size-4 rounded-2xl shadow-2xl transition-transform duration-700', value ? 'bg-primary translate-x-4' : 'bg-white translate-x-0']}></div>
</button>
<style>

</style>
