const { getIllustration } = require('./illustrations');

const generateZineHTML = (cuento) => {
  const titulo = cuento.titulo;
  const p = cuento.paginas; 
  
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${titulo}</title>
      <style>
        /* 1. Definimos la hoja física a nivel sistema */
        @page { size: letter portrait; margin: 0; }
        * { box-sizing: border-box; }
        
        html, body {
          margin: 0; padding: 0; 
          width: 8.5in; height: 11in; 
          background-color: white; 
          font-family: 'Comic Sans MS', 'Chalkboard SE', 'Nunito', sans-serif;
          overflow: hidden;
        }

        /* 2. Cuadrícula segura: 8x10 pulgadas, márgenes simétricos */
        .zine-container {
          width: 8.0in; 
          height: 10.0in; 
          position: absolute;
          top: 0.5in;  /* (11 - 10) / 2 */
          left: 0.25in; /* (8.5 - 8) / 2 */
          display: grid; 
          grid-template-columns: 0.8fr 0.8fr; /* 4.0in de ancho */
          grid-template-rows: repeat(4, 1fr); /* 2.5in de alto */
          border: 1px solid #ccc; /* 🛡️ REGLA EXTRA: Prohibido romper este contenedor */
          page-break-inside: avoid;
          break-inside: avoid;
        }

        /* 3. Panel actúa como ancla (position: relative) */
        .panel {
          width: 100%; height: 100%; border: 1px dashed #e0e0e0;
          position: relative; /* 🛡️ EL ANTÍDOTO AL DESFASE DE LA FILA 4: */
          overflow: hidden; 
          page-break-inside: avoid;
          break-inside: avoid;
        }

        /* 4. EL SECRETO: Absolute saca la caja del flujo. Centramos y luego rotamos. */
        .content-wrapper {
          position: absolute;
          top: 50%; left: 50%;
          width: 2.5in;  /* Inverso: Es el alto del panel */
          height: 4.0in; /* Inverso: Es el ancho del panel */
          padding: 0.15in 0.2in;
          display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        }
        
        .rot-90 { transform: translate(-50%, -50%) rotate(90deg); }
        .rot-270 { transform: translate(-50%, -50%) rotate(-90deg); }
        
        /* 5. Tipografías controladas */
        h1 { font-size: 17px; color: #333; margin: 0 0 8px 0; line-height: 1.1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        p.text { font-size: 13px; color: #444; line-height: 1.35; margin: 0; display: -webkit-box; -webkit-line-clamp: 7; -webkit-box-orient: vertical; overflow: hidden; }
        
        .illustration { width: 75px; height: 75px; margin: 12px 0; display: flex; justify-content: center; align-items: center; }
        .illustration svg { width: 100%; height: 100%; }
        
        .cut-line { position: absolute; left: 50%; top: 25%; width: 2px; height: 50%; border-left: 2px dashed #ff4757; z-index: 10; }
        .page-number { position: absolute; bottom: 4px; font-size: 10px; color: #888; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="zine-container">
        <!-- LÍNEA ROJA DE CORTE -->
        <div class="cut-line"></div>

        <!-- FILA 1 -->
        <div class="panel">
          <div class="content-wrapper rot-90">
            <p class="text">${p[5].texto}</p>
            <div class="illustration">${getIllustration(p[5].emocion_visual)}</div>
            <span class="page-number">6</span>
          </div>
        </div>
        <div class="panel">
          <div class="content-wrapper rot-270">
            <p class="text">${p[4].texto}</p>
            <div class="illustration">${getIllustration(p[4].emocion_visual)}</div>
            <span class="page-number">5</span>
          </div>
        </div>

        <!-- FILA 2 -->
        <div class="panel">
          <div class="content-wrapper rot-90">
            <p class="text">${p[6].texto}</p>
            <div class="illustration">${getIllustration(p[6].emocion_visual)}</div>
            <span class="page-number">7</span>
          </div>
        </div>
        <div class="panel">
          <div class="content-wrapper rot-270">
            <p class="text">${p[3].texto}</p>
            <div class="illustration">${getIllustration(p[3].emocion_visual)}</div>
            <span class="page-number">4</span>
          </div>
        </div>

        <!-- FILA 3 -->
        <div class="panel">
          <div class="content-wrapper rot-90">
            <p class="text">${p[7].texto}</p>
            <div class="illustration">${getIllustration(p[7].emocion_visual)}</div>
            <span class="page-number">8</span>
          </div>
        </div>
        <div class="panel">
          <div class="content-wrapper rot-270">
            <p class="text">${p[2].texto}</p>
            <div class="illustration">${getIllustration(p[2].emocion_visual)}</div>
            <span class="page-number">3</span>
          </div>
        </div>

        <!-- FILA 4 -->
        <div class="panel">
          <div class="content-wrapper rot-90">
            <h1>${titulo}</h1>
            <div class="illustration" style="width: 85px; height: 85px;">${getIllustration(p[0].emocion_visual)}</div>
            <p class="text">${p[0].texto}</p>
            <span class="page-number">1</span>
          </div>
        </div>
        <div class="panel">
          <div class="content-wrapper rot-270">
            <p class="text">${p[1].texto}</p>
            <div class="illustration">${getIllustration(p[1].emocion_visual)}</div>
            <span class="page-number">2</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateZineHTML };