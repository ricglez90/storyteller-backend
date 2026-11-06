const buildStoryPrompt = ({ nombre, edad, tema, usaFantasia }) => {
  
  // Regla dinámica para el protagonista
  const instruccionProtagonista = usaFantasia 
  ? `IMPORTANTE: El protagonista DEBE ser un animal EXÓTICO O POCO COMÚN. 
     - REGLA 1: Elige de forma 100% ALEATORIA entre animales como: Ajolote, Pangolín, Capibara, Panda Rojo, Quokka, Zorro Fénec, Tapir, Narval, Ornitorrinco, etc. ¡Sorpréndeme, no repitas!
     - REGLA 2: Inventa un nombre MUY original y creativo. ESTRICTAMENTE PROHIBIDO usar nombres comunes, clichés o rimas (nada de "Leo el león" o "Toby").
     - REGLA 3: Integra una característica física real de este animal como parte de su habilidad especial para enfrentar el reto del cuento.`
  : `El protagonista es un niño/a humano llamado ${nombre}.`;
  // const instruccionProtagonista = usaFantasia 
  //   ? `El protagonista DEBE ser un animalito o criatura mágica adorable. NUNCA uses el nombre "${nombre}" dentro del cuerpo de la historia.`
  //   : `El protagonista DEBE ser un niño o niña genérico. NUNCA uses el nombre "${nombre}" dentro del cuerpo de la historia.`;

  return `
Eres un autor experto en literatura infantil, psicología del desarrollo y el paradigma tridimensional (3D) de la Indagación Narrativa de Clandinin y Connelly.

VARIABLES DEL CUENTO:
- Dedicado a: ${nombre} (SOLO USAR EN EL TÍTULO)
- Edad del lector: ${edad} años
- Tema a trabajar: ${tema}

INSTRUCCIONES DEL PROTAGONISTA:
${instruccionProtagonista}
El título del cuento DEBE incluir el nombre del niño (ej. "El cuento mágico de ${nombre}: El osito valiente"). NUNCA menciones a "${nombre}" en los 8 párrafos del cuento.

PARADIGMA 3D (Narrative Inquiry):
La historia debe tejerse bajo estas 3 dimensiones para ser terapéutica y contundente:
1. Interacción: Muestra los sentimientos internos del protagonista y su conexión empática con otros personajes.
2. Continuidad: Conecta una experiencia que le costaba trabajo en el pasado, su esfuerzo en el presente y su éxito en el futuro.
3. Situación: Describe un entorno físico o paisaje vívido, seguro y reconfortante.

REGLAS DE SEGURIDAD (GUARDRAILS):
- ESTRICTAMENTE apto para niños pequeños.
- Cero violencia, cero lenguaje inapropiado, cero situaciones de riesgo o angustia profunda. 
- Si es fantasía, la magia debe ser sutil y al servicio de la moraleja, sin tramas oscuras.

REGLAS DE FORMATO ZINE (ESTRICTAS):
- Divide la historia EXACTAMENTE en 8 partes.
- Máximo 40 palabras por parte (muy importante para la impresión).
- Asigna una "emocion_visual" a cada parte usando SOLO estas opciones: 
  [feliz, triste, asustado, valiente, asombrado, pensativo, neutro, enojado, orgulloso, cansado].
  `;
};

module.exports = { buildStoryPrompt };