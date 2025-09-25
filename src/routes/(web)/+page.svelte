<script lang="ts">
  import { ButtonLink } from "$modules/shared/components/button";
  import Flex from "$modules/shared/layout/Flex.svelte";
  import { getUserContext } from "$modules/users/contexts/user.svelte";
  import { IconPhone } from "@tabler/icons-svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

  const user = getUserContext()
</script>

<!-- Portada -->
<section class="front flex relative justify-items-center -z-1">
  <div class="max-w-6xl m-auto flex items-center ">
    <div class="relative">
      <img
        src="https://img.pikbest.com/png-images/20240822/female-medical-staff-vector-illustration-nurse-doctor-therapist_10749416.png!sw800"
        alt=""
        class="ident max-h-96"
      />
      <img
        src="https://img.pikbest.com/png-images/20240822/female-medical-staff-vector-illustration-nurse-doctor-therapist_10749416.png!sw800"
        alt=""
        class="ident max-h-96 absolute blur-3xl top-0 left-96 -z-20 scale-150"
      />
    </div>
    <div class="px-5 flex flex-col gap-6 ">
      <p class="vb font-dela text-6xl  max-w-4xl text-shadow-black text-shadow-sm">
        <span class="text-purple-400">Kits</span> médicas fáciles, cuando las necesitas
      </p>
      <div class="flex">
        <img src="https://mockmind-api.uifaces.co/content/human/203.jpg" alt="" class="size-10 rounded-full border-2 border-blue-200">
        <img src="https://mockmind-api.uifaces.co/content/human/201.jpg" alt="" class="size-10 rounded-full border-2 border-green-200 -ml-2">
        <img src="https://mockmind-api.uifaces.co/content/human/202.jpg" alt="" class="size-10 rounded-full border-2 border-red-200 -ml-2">
        <img src="https://mockmind-api.uifaces.co/content/human/204.jpg" alt="" class="size-10 rounded-full border-2 border-orange-200 -ml-2">
        <img src="https://mockmind-api.uifaces.co/content/human/205.jpg" alt="" class="size-10 rounded-full border-2 border-blue-200 -ml-2">
      </div>
      <p class="text-zinc-300 italic text-2xl max-w-2xl font-fuzzy">
        Plataforma integral para pacientes, médicos independientes y clínicas.
        Agenda en minutos
      </p>
      <li class="flex gap-3">
        <ButtonLink href="/" variant="secondary" size="lg" radius="full">
          Get started
        </ButtonLink>
        <ButtonLink href="/" size="lg" radius="full">
          <IconPhone/>
          Contact
        </ButtonLink>
      </li>
    </div>
  </div>
</section>
{#snippet jk(src: string)}
  <div class="flex items-center gap-8 justify-center">
    <Flex direction="col" class="items-end gap-2">
      <div class="border text-sm px-2 border-zinc-700 rounded-full bg-zinc-800 my-4">Designer</div>
      <h2 class="text-3xl font-bold">Rodigro Marco Suarez Pascual</h2>
      <p class="text-right py-3 text-zinc-400 max-w-96">Siempre he pensado en lo mejores de nosotros y responsabilidaLorem ipsum dolor sit amet consectetur, adipisicing elit. Esse laborum quis ut. Maxime repellendus minus quis culpa laborum molestiae modi?</p>
      <div class="flex gap-2">
        <button class="h-9 flex items-center px-3 bg-purple-200 rounded-2xl text-black text-sm">Consultar</button>
        <button class="h-9 flex items-center px-3 bg-purple-200 rounded-2xl text-black text-sm">Ver detalles</button>
        <button class="h-9 flex items-center px-3 bg-purple-200 rounded-2xl text-black text-sm">Opiniones</button>
      </div>
    </Flex>
    <div class="hover:rotate-3 transition-all duration-100 hover:scale-125">
      <img {src} alt="" class="size-72 absolute scale-150 rounded-3xl blur-3xl -z-30 -translate-x-36">
      <img {src} alt="" class="size-72 rounded-2xl">
    </div>
  </div>
{/snippet}
{#snippet jkl(src: string)}
  <div class="flex items-center gap-8 justify-center group">
    <div class="">
      <img {src} alt="" class="size-72 absolute scale-150 rounded-3xl blur-3xl -z-30 translate-x-36 group-hover:translate-x-24 transition-all duration-1000">
      <img {src} alt="" class="size-72 rounded-2xl group-hover:-rotate-3 transition-all duration-100 group-hover:scale-110">
    </div>
    <Flex direction="col" class="items-start gap-2">
      <div class="border text-sm px-2 border-zinc-700 rounded-full bg-zinc-800 my-4">Designer</div>
      <h2 class="text-3xl font-bold">Flor Lena Mirta</h2>
      <p class="py-3 text-zinc-400 max-w-96">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse laborum quis ut. Maxime repellendus minus quis culpa laborum molestiae modi?</p>
      <div class="flex gap-2">
        <button class="h-9 flex items-center px-3 bg-purple-200 rounded-2xl text-black text-sm">Consultar</button>
        <button class="h-9 flex items-center px-3 bg-purple-200 rounded-2xl text-black text-sm">Ver detalles</button>
        <button class="h-9 flex items-center px-3 bg-purple-200 rounded-2xl text-black text-sm">Opiniones</button>
      </div>
    </Flex>
  </div>
{/snippet}
<section class="max-w-6xl m-auto p-5 flex flex-col gap-10">
  {@render jk('https://mockmind-api.uifaces.co/content/human/207.jpg')}
  {@render jkl('https://mockmind-api.uifaces.co/content/human/212.jpg')}
  {@render jk('https://mockmind-api.uifaces.co/content/human/201.jpg')}
  {@render jkl('https://mockmind-api.uifaces.co/content/human/202.jpg')}
  {@render jk('https://mockmind-api.uifaces.co/content/human/203.jpg')}
  {@render jkl('https://mockmind-api.uifaces.co/content/human/204.jpg')}
  {@render jk('https://mockmind-api.uifaces.co/content/human/205.jpg')}
  {@render jkl('https://mockmind-api.uifaces.co/content/human/206.jpg')}
  {@render jk('https://mockmind-api.uifaces.co/content/human/207.jpg')}
  {@render jkl('https://mockmind-api.uifaces.co/content/human/208.jpg')}
  {@render jk('https://mockmind-api.uifaces.co/content/human/209.jpg')}
  {@render jkl('https://www.webyempresas.com/wp-content/uploads/2018/11/amplitud.jpg')}
</section>
<style>
  .front {
    height: calc(100vh - 64px);
  }
</style>
