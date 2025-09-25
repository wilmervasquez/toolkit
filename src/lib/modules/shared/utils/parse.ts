export function userAgent(userAgent: string) {
  const osRegex = /(Windows NT [\d.]+)|(Macintosh; Intel Mac OS X [\d._]+)|(Linux [\w\s]+)|(Android [\d.]+)|(iOS [\d._]+)/i;
  const browserRegex = /(Chrome\/[\d.]+)|(Firefox\/[\d.]+)|(Safari\/[\d.]+)|(Edge\/[\d.]+)|(Opera\/[\d.]+)/i;

  const osMatch = userAgent.match(osRegex);
  const browserMatch = userAgent.match(browserRegex);

  const os = osMatch ? osMatch[0] : "Unknown OS";
  const browser = browserMatch ? browserMatch[0] : "Unknown Browser";

  // Extraer versiones
  const osVersion = os.match(/[\d._]+/)?.[0] || "Unknown";
  const browserVersion = browser.match(/[\d.]+/)?.[0] || "Unknown";
  return {
    os: {
      name: os.split(" ")[0], // Obtener solo el nombre del sistema operativo
      version: osVersion,
    },
    browser: {
      name: browser.split("/")[0], // Obtener solo el nombre del navegador
      version: browserVersion,
    }
  }
}

const browsers = ['Chrome', 'Firefox']
export function getBrowserUserAgent(userAgent: string) {
  for (const br of browsers) {
    const r = userAgent.match(new RegExp(`${br}/[^ ]+`,'g'))

    if (r) {
      return r[0]
    }
  }
  return 'Unknow'
}
