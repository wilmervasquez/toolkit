class AppTheme {
  static colors(colorsName: string[]) {
    const obj: Record<string, string> = {}

    for (const key of colorsName) {
      obj[key] = `hsl(var(--color-${key}))`
    }
    return obj
  }
}

export default AppTheme;
