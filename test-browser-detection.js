/**
 * Script de prueba para verificar la detección de navegadores
 * Ejecutar con: node test-browser-detection.js
 */

const fs = require('fs');

console.log('');
console.log('🔍 Verificando navegadores instalados en el sistema...');
console.log('');

const browserPaths = [
  // Google Chrome
  { name: 'Google Chrome (64-bit)', path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' },
  { name: 'Google Chrome (32-bit)', path: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' },
  { name: 'Google Chrome (User)', path: process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe' },
  
  // Microsoft Edge
  { name: 'Microsoft Edge (64-bit)', path: 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe' },
  { name: 'Microsoft Edge (32-bit)', path: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' },
  
  // Brave Browser
  { name: 'Brave Browser', path: process.env.LOCALAPPDATA + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe' },
  
  // Chromium
  { name: 'Chromium', path: process.env.LOCALAPPDATA + '\\Chromium\\Application\\chrome.exe' },
];

let found = false;

browserPaths.forEach(browser => {
  if (!browser.path) return;
  
  try {
    if (fs.existsSync(browser.path)) {
      console.log('✅ ' + browser.name);
      console.log('   📁 ' + browser.path);
      console.log('');
      found = true;
    }
  } catch (error) {
    // Ignorar errores
  }
});

if (!found) {
  console.log('❌ No se encontró ningún navegador compatible instalado.');
  console.log('');
  console.log('📥 Opciones:');
  console.log('   1. Instalar Google Chrome: https://www.google.com/chrome/');
  console.log('   2. Usar Microsoft Edge (ya viene con Windows 10/11)');
  console.log('   3. Instalar Brave Browser: https://brave.com/');
  console.log('');
} else {
  console.log('✅ Puppeteer podrá usar estos navegadores para generar PDFs.');
  console.log('');
}

// Verificar variables de entorno
console.log('🔧 Variables de entorno:');
console.log('   CHROME_PATH: ' + (process.env.CHROME_PATH || 'No definida'));
console.log('   PUPPETEER_EXECUTABLE_PATH: ' + (process.env.PUPPETEER_EXECUTABLE_PATH || 'No definida'));
console.log('   NODE_ENV: ' + (process.env.NODE_ENV || 'No definida'));
console.log('');
