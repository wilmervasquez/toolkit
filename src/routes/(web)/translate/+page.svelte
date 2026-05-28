<script lang="ts">
    import TextLoading from "$modules/shared/components/preview/TextLoading.svelte";
    import { setColorSchemeContext } from "$modules/shared/contexts/color-scheme";
    import { IconArrowsExchange } from "@tabler/icons-svelte";

  setColorSchemeContext()

  let gtSpainToEnglish;
  let gtEnglishToSpain;

  let value = $state("");
  let result = $state("");

  let sourceLanguage = $state("es");
  let loadingTranslate = $state(false);

  (async () => {
    gtSpainToEnglish = await Translator.create({
      sourceLanguage: "es",
      targetLanguage: "en",
    });

    gtEnglishToSpain = await Translator.create({
      sourceLanguage: "en",
      targetLanguage: "es",
    });
  })();

  async function translate(value: string) {
    let gt = sourceLanguage == 'es' ? gtSpainToEnglish : gtEnglishToSpain;

    try {
      loadingTranslate = true
      result = await gt.translate(value);
    } catch (error) { } finally {
      setTimeout(() => {
        loadingTranslate = false
      }, 3000);
    }
  }

  async function changeLanguage() {
    sourceLanguage = sourceLanguage === "es" ? 'en' : 'es'
    value = result
  }

  $effect(() => {
    translate(value);
  });


</script>
<main class="max-w-6xl m-auto p-4">
  <div class="mk grid p-2 gap-2">
    <div class="flex">
      {sourceLanguage == 'es' ? 'Spain' : 'English'}
    </div>
    <button onclick={changeLanguage} class="p-2 border border-neutral-800 rounded-lg">
      <IconArrowsExchange/>
    </button>
    <div class="flex">
      {sourceLanguage == 'es' ? 'English' : 'Spain'}
    </div>
  </div>
  <div class="grid grid-cols-2 gap-2">
    <textarea bind:value={value} placeholder="Write..." class="px-3 py-2 bg-zinc-900 rounded-lg"></textarea>
    <div class="px-3 py-2 bg-zinc-900 rounded-lg">
      <p class="mki">{result}</p>
      {#if loadingTranslate}
        <div class="flex gap-2 mki">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="SVGr0dxBdJO" attributeName="transform" begin="0;SVG7Xy0ecki.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="0;SVG7Xy0ecki.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="0;SVG7Xy0ecki.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="SVGp2dhBhxA" attributeName="transform" begin="SVGr0dxBdJO.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="SVGr0dxBdJO.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="SVGr0dxBdJO.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="SVG7Xy0ecki" attributeName="transform" begin="SVGr0dxBdJO.begin+0.8s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="SVGr0dxBdJO.begin+0.8s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="SVGr0dxBdJO.begin+0.8s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path></svg>
          <TextLoading text="loading"/>
        </div>
      {/if}
    </div>
  </div>
</main>
<style>
  .mk {
    grid-template-columns: 1fr auto 1fr;
  }
  .mki {
    animation: gh .5s forwards;
  }

  @keyframes gh {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0px);
    }
  }
</style>
