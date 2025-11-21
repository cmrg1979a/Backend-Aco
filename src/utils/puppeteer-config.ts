/**
 * Configuración centralizada de Puppeteer para el proyecto
 * Maneja la detección automática de Chrome/Edge en Windows y Linux
 */

import * as fs from 'fs';

export interface PuppeteerLaunchOptions {
  headless: boolean | 'new';
  args: string[];
  executablePath?: string;
}

/**
 * Busca navegadores compatibles instalados en el sistema
 * Prioridad: Chrome > Edge > Brave > Chromium
 * @returns Ruta al ejecutable del navegador o null si no se encuentra
 */
function findChromePath(): string | null {
  const platform = process.platform;
  
  let browserPaths: string[] = [];

  if (platform === 'win32') {
    // Windows: Chrome, Edge, Brave, Chromium
    browserPaths = [
      // Google Chrome (más común)
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe` : null,
      process.env.PROGRAMFILES ? `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe` : null,
      
      // Microsoft Edge (segunda opción)
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      process.env.PROGRAMFILES ? `${process.env.PROGRAMFILES}\\Microsoft\\Edge\\Application\\msedge.exe` : null,
      
      // Brave Browser
      process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe` : null,
      'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
      
      // Chromium
      process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\Chromium\\Application\\chrome.exe` : null,
      
      // Variable de entorno personalizada (máxima prioridad si está definida)
      process.env.CHROME_PATH,
      process.env.PUPPETEER_EXECUTABLE_PATH,
    ].filter(Boolean) as string[];
  } else if (platform === 'darwin') {
    // macOS
    browserPaths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      process.env.CHROME_PATH,
      process.env.PUPPETEER_EXECUTABLE_PATH,
    ].filter(Boolean) as string[];
  } else {
    // Linux
    browserPaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/usr/bin/microsoft-edge',
      '/snap/bin/chromium',
      process.env.CHROME_PATH,
      process.env.PUPPETEER_EXECUTABLE_PATH,
    ].filter(Boolean) as string[];
  }

  // Buscar el primer ejecutable que exista
  for (const path of browserPaths) {
    try {
      if (fs.existsSync(path)) {
        const browserName = path.includes('chrome') ? 'Chrome' :
                           path.includes('edge') || path.includes('msedge') ? 'Edge' :
                           path.includes('brave') ? 'Brave' :
                           'Chromium';
        console.log(`✅ ${browserName} encontrado en: ${path}`);
        return path;
      }
    } catch (error) {
      // Ignorar errores de acceso
    }
  }

  console.warn('⚠️ No se encontró ningún navegador compatible instalado.');
  console.warn('   Puppeteer intentará descargar Chromium automáticamente.');
  console.warn('   Para evitar esto, instala Chrome, Edge o Brave, o define CHROME_PATH en .env');
  return null;
}

/**
 * Obtiene la configuración de Puppeteer según el entorno
 * @returns Opciones de configuración para puppeteer.launch()
 */
export function getPuppeteerConfig(): PuppeteerLaunchOptions {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Configuración para producción (Linux)
    return {
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };
  } else {
    // Configuración para desarrollo (Windows)
    const chromePath = findChromePath();
    
    const config: PuppeteerLaunchOptions = {
      headless: 'new', // Usar el nuevo modo headless (más estable con Edge)
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };

    // Solo agregar executablePath si encontramos Chrome/Edge
    if (chromePath) {
      config.executablePath = chromePath;
    }

    return config;
  }
}

/**
 * Obtiene la configuración de Puppeteer con headless "new"
 * @returns Opciones de configuración para puppeteer.launch() con headless new
 */
export function getPuppeteerConfigNew(): PuppeteerLaunchOptions {
  const config = getPuppeteerConfig();
  config.headless = 'new';
  return config;
}

/**
 * Obtiene la configuración de Puppeteer con opciones adicionales para PDFs
 * @returns Opciones de configuración optimizadas para generación de PDFs
 */
export function getPuppeteerConfigForPDF(): PuppeteerLaunchOptions {
  const config = getPuppeteerConfig();
  
  // Agregar argumentos adicionales para mejorar la generación de PDFs
  config.args = [
    ...config.args,
    '--disable-dev-shm-usage', // Evita problemas de memoria compartida
    '--disable-gpu', // Desactiva GPU (no necesaria para PDFs)
    '--disable-software-rasterizer',
    '--disable-extensions',
    '--no-first-run',
    '--no-zygote',
    '--disable-web-security', // Necesario para algunos navegadores
    '--disable-features=IsolateOrigins,site-per-process', // Mejora compatibilidad
    '--disable-blink-features=AutomationControlled', // Evita detección de automatización
  ];
  
  // Agregar timeout más largo para Edge
  const configWithTimeout: any = {
    ...config,
    timeout: 60000, // 60 segundos en lugar de 30
    dumpio: false, // No mostrar salida del navegador (puede causar problemas)
  };
  
  return configWithTimeout;
}

/**
 * Verifica si hay un navegador disponible
 * @returns true si se encontró un navegador, false en caso contrario
 */
export function hasBrowserAvailable(): boolean {
  return findChromePath() !== null;
}

/**
 * Obtiene información sobre el navegador detectado
 * @returns Objeto con información del navegador o null
 */
export function getBrowserInfo(): { name: string; path: string } | null {
  const path = findChromePath();
  if (!path) return null;
  
  const name = path.includes('chrome') ? 'Google Chrome' :
               path.includes('edge') || path.includes('msedge') ? 'Microsoft Edge' :
               path.includes('brave') ? 'Brave Browser' :
               'Chromium';
  
  return { name, path };
}
