import { browser } from "$app/environment";

const KEY_STORAGE = 'app.user.config.colorScheme'

export class ColorSchemeState {
  preffered: 'light' | 'dark' | 'system' = $state(getPrefersColorSchema());
  mode = $derived(this.preffered == 'system' ? getSystemColorSchema() : this.preffered)

  constructor() {
    $effect(() => {
      if (this.mode == 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem(KEY_STORAGE, this.preffered)
    })
  }

  toggle () {
    this.preffered = this.preffered == 'dark' ? 'light' : 'dark'
  }

  isDark() {
    return this.mode === 'dark'
  }
}

function getPrefersColorSchema() {
  if (!browser) return 'system';
  const theme = localStorage.getItem(KEY_STORAGE);
  if (theme === 'light' || theme === 'dark') return theme;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getSystemColorSchema() {
  if (!browser) return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
