<script lang="ts">
  interface Props {
    name: string
    placeholder: string
  }
  const { name, placeholder }: Props = $props();
</script>
<input {name} {placeholder} class="text-sm mt-3 py-2 px-3 border border-zinc-200 dark:border-[#27272D] rounded-md bg-zinc-50 dark:bg-[#1E1E23]">
<style>

</style>
