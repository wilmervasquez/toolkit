<script lang="ts">
  import nurse from '../assets/nurse.jpeg'
  import { Icon12Hours, IconBadgeCcFilled, IconHospital, IconPhone } from "@tabler/icons-svelte";
  import Mail from "@tabler/icons-svelte/icons/mail";
  let name = "Dr. Marco Ruiz";
  let specialty = "Cardiólogo";
  let phone = "+51 987 654 321";
  let email = "marco.ruiz@wavecare.pe";
  let avatarUrl = "https://i.pravatar.cc/150?img=12";
  let clinic = "Clínica Huánuco Salud";
  let licenseNumber = "CMP 123456";

</script>
<div class="bg-white dark:bg-zinc-900 inset-shadow-sm inset-shadow-zinc-800 rounded-2xl p-1 gap-4 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-zinc-800">
  <enhanced:img src="../assets/nurse.jpeg" class="rounded-2xl"/>
  <div class="flex-1">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{name}</h2>
    <p class="text-sm text-primary font-medium flex items-center gap-1">
      <Icon12Hours class="w-4 h-4 text-primary" /> {specialty}
    </p>

    <div class="mt-2 space-y-1 text-sm text-gray-600 dark:text-zinc-300">
      <p class="flex items-center gap-2"><IconPhone class="w-4 h-4" /> {phone}</p>
      <p class="flex items-center gap-2"><Mail class="w-4 h-4" /> {email}</p>
      <p class="flex items-center gap-2"><IconHospital class="w-4 h-4" /> {clinic}</p>
      <p class="flex items-center gap-2"><IconBadgeCcFilled class="w-4 h-4" /> CMP: {licenseNumber}</p>
    </div>
    <button class="bg-purple-500 h-8 rounded-lg px-3 text-sm inset-shadow-sm inset-shadow-purple-400 shadow-sm shadow-black">Consult</button>
  </div>
</div>
<style>

</style>
