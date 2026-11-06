const puppeteer = require('puppeteer');

const generatePDF = async (htmlContent) => {
  // Lanzamos un navegador invisible (headless) con banderas optimizadas para servidores gratuitos
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage', // Vital para evitar que Chrome se quede sin memoria en Linux
    '--disable-gpu',
    '--single-process',
    '--no-zygote'
    ]
  });

  const page = await browser.newPage();
  
  // Cargamos el HTML de nuestra plantilla Zine
//   await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Desactivamos el límite de 30 segundos en la carga
await page.setContent(htmlContent, {
  waitUntil: 'networkidle0', // o 'domcontentloaded'
  timeout: 0 
});



  // Generamos el PDF con formato Carta Horizontal y sin márgenes
//   const pdfBuffer = await page.pdf({
//     format: 'Letter',
//     landscape: false,
//     printBackground: true, // Obliga a imprimir colores de fondo y bordes
//     margin: { top: 0, right: 0, bottom: 0, left: 0 }
//   });
  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true, // ESTO ES CLAVE PARA EVITAR EL REESCALADO
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    timeout: 0
  });

  await browser.close();
  return pdfBuffer;
};

module.exports = { generatePDF };