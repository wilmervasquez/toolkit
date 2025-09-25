import { ColorSchemeState } from '$modules/shared/states/color-schema.svelte';
import { setContext, getContext } from 'svelte'

const KEY = Symbol();

export function setColorSchemeContext() {
  return setContext(KEY, new ColorSchemeState())
}

export function getColorSchemeContext(): ColorSchemeState {
  return getContext(KEY)
}
