// Diseños minimalistas y adorables basados en geometría simple
const emotionSVGs = {
  feliz: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FFD93D" />
      <circle cx="35" cy="40" r="5" fill="#333" />
      <circle cx="65" cy="40" r="5" fill="#333" />
      <path d="M 30 60 Q 50 80 70 60" stroke="#333" stroke-width="5" stroke-linecap="round" fill="none" />
      <circle cx="25" cy="55" r="4" fill="#FF8B8B" opacity="0.6"/>
      <circle cx="75" cy="55" r="4" fill="#FF8B8B" opacity="0.6"/>
    </svg>`,
    
  triste: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#A0C4E8" />
      <circle cx="35" cy="45" r="5" fill="#333" />
      <circle cx="65" cy="45" r="5" fill="#333" />
      <path d="M 35 70 Q 50 60 65 70" stroke="#333" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M 35 55 L 35 65" stroke="#4A90E2" stroke-width="3" stroke-linecap="round" />
    </svg>`,
    
  asustado: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#BCAAA4" />
      <circle cx="35" cy="40" r="7" fill="#333" />
      <circle cx="65" cy="40" r="7" fill="#333" />
      <circle cx="35" cy="40" r="2" fill="#FFF" />
      <circle cx="65" cy="40" r="2" fill="#FFF" />
      <ellipse cx="50" cy="70" rx="8" ry="12" fill="#333" />
      <path d="M 25 25 Q 35 20 45 25" stroke="#333" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M 75 25 Q 65 20 55 25" stroke="#333" stroke-width="4" stroke-linecap="round" fill="none" />
    </svg>`,
    
  valiente: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FF8B8B" />
      <path d="M 25 35 L 45 42" stroke="#333" stroke-width="5" stroke-linecap="round" />
      <path d="M 75 35 L 55 42" stroke="#333" stroke-width="5" stroke-linecap="round" />
      <circle cx="35" cy="48" r="5" fill="#333" />
      <circle cx="65" cy="48" r="5" fill="#333" />
      <path d="M 35 70 L 65 70" stroke="#333" stroke-width="5" stroke-linecap="round" />
    </svg>`,
    
  asombrado: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FFB74D" />
      <circle cx="35" cy="45" r="8" fill="#333" />
      <circle cx="65" cy="45" r="8" fill="#333" />
      <circle cx="35" cy="43" r="3" fill="#FFF" />
      <circle cx="65" cy="43" r="3" fill="#FFF" />
      <circle cx="50" cy="75" r="10" fill="#333" />
    </svg>`,
    
  pensativo: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#81C784" />
      <circle cx="30" cy="40" r="5" fill="#333" />
      <circle cx="55" cy="35" r="5" fill="#333" />
      <path d="M 35 70 Q 40 65 45 70 T 55 70 T 65 70" stroke="#333" stroke-width="4" fill="none" />
      <circle cx="75" cy="65" r="8" fill="#FFF" opacity="0.8"/>
    </svg>`,
    
  neutro: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#E0E0E0" />
      <circle cx="35" cy="45" r="5" fill="#333" />
      <circle cx="65" cy="45" r="5" fill="#333" />
      <path d="M 40 70 L 60 70" stroke="#333" stroke-width="5" stroke-linecap="round" />
    </svg>`,


  
  enojado: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#EF9A9A" />
      <path d="M 25 35 L 40 45" stroke="#D32F2F" stroke-width="5" stroke-linecap="round" />
      <path d="M 75 35 L 60 45" stroke="#D32F2F" stroke-width="5" stroke-linecap="round" />
      <circle cx="35" cy="50" r="5" fill="#333" />
      <circle cx="65" cy="50" r="5" fill="#333" />
      <path d="M 40 70 Q 50 60 60 70" stroke="#333" stroke-width="5" stroke-linecap="round" fill="none" />
    </svg>`,

  orgulloso: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FFF59D" />
      <path d="M 30 40 Q 35 30 40 40" stroke="#333" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M 70 40 Q 65 30 60 40" stroke="#333" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M 30 60 Q 50 80 70 60" stroke="#333" stroke-width="5" stroke-linecap="round" fill="none" />
      <circle cx="20" cy="50" r="6" fill="#FFCC80" opacity="0.8"/>
      <circle cx="80" cy="50" r="6" fill="#FFCC80" opacity="0.8"/>
    </svg>`,

  cansado: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#B39DDB" />
      <path d="M 25 45 Q 35 55 45 45" stroke="#333" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M 75 45 Q 65 55 55 45" stroke="#333" stroke-width="4" stroke-linecap="round" fill="none" />
      <circle cx="50" cy="70" r="6" fill="#333" />
      <!-- Zzz flotando -->
      <text x="65" y="30" font-family="Arial" font-size="14" fill="#5E35B1" font-weight="bold">Z</text>
      <text x="75" y="20" font-family="Arial" font-size="10" fill="#5E35B1" font-weight="bold">z</text>
    </svg>`
};

// Función auxiliar para obtener el SVG de forma segura
const getIllustration = (emotion) => {
  const normalizedEmotion = emotion ? emotion.toLowerCase().trim() : 'neutro';
  return emotionSVGs[normalizedEmotion] || emotionSVGs['neutro'];
};

module.exports = { getIllustration };