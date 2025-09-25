<script lang="ts">
  import { page } from '$app/state';
  import { ButtonLink } from '$modules/shared/components/button';
  import { setColorSchemeContext } from '$modules/shared/contexts/color-scheme';

  setColorSchemeContext()
</script>
<div class="h-screen grid place-items-center">
  <div class="flex flex-col items-center">
    <h1 class="text-8xl font-semibold">{page?.status}</h1>
    <p>{page.error?.message}</p>
    <div class="flex gap-3 p-3">
      <ButtonLink href="/?mix=12" variant="secondary" radius="full">Go to home</ButtonLink>
      <ButtonLink href="" radius="full">Go to back</ButtonLink>
    </div>
  </div>
</div>
