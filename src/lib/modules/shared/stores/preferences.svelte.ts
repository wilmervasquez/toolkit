export type Theme = 'light' | 'dark' | 'system'
export type ColorTheme = {
  preference: 'light' | 'dark' | 'system'
  mode: 'light' | 'dark'
}

export function isDarkThemeSystem() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function getColorThemeStorage(): ColorTheme {
  const theme = localStorage.getItem('user.preference.theme');
  if (theme === 'light' || theme === 'dark') {
    return {
      preference: theme,
      mode: theme
    }
  }
  return {
    preference: 'system',
    mode: isDarkThemeSystem() ? 'dark' : 'light'
  }
}

export function setColorThemeApp(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    return
  }
  document.documentElement.classList.remove('dark')
}

const colorTheme: ColorTheme = $state({
  preference: 'system',
  mode: 'light'
});

export function getColorTheme(): ColorTheme {
  return colorTheme
}

export function setColorTheme(theme: Theme) {
  colorTheme.preference = theme
  if (theme === 'system') {
    colorTheme.mode = isDarkThemeSystem() ? 'dark' : 'light';
  } else {
    colorTheme.mode = theme
  }
  setColorThemeApp(colorTheme.mode)
  localStorage.setItem('user.preference.theme', colorTheme.preference)
}
