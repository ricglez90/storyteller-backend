require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
const { GoogleGenAI } = require('@google/genai')

const { buildStoryPrompt } = require('./prompts/storyPrompt')
const { generateZineHTML } = require('./utils/zineTemplate')
const { generatePDF } = require('./utils/pdfGenerator')

const { getIllustration } = require('./utils/illustrations')

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express()
app.use(cors())
app.use(express.json())

// Inicializar clientes
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// Middleware para verificar el JWT de Supabase
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Falta el token de autenticación' })
  }

  const token = authHeader.split(' ')[1]
  
  // Supabase verifica si el token es válido
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }

  req.user = user // Adjuntamos el usuario a la petición
  next()
}

// Endpoint principal de generación
app.post('/api/generar-cuento', authenticateUser, async (req, res) => {
  const { nombre, edad, tema, usaFantasia } = req.body
  const userId = req.user.id

  if (!nombre || !edad || !tema) {
    return res.status(400).json({ error: 'Faltan datos (nombre, edad, tema)' })
  }

  try {
  // 1. Validar que el usuario tenga créditos
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('credits_available')
    .eq('id', userId)
    .single()

  if (profileError) console.error('DETALLE EXACTO DE SUPABASE:', profileError)
  if (profileError || !profile) {
    throw new Error('Error al consultar el perfil del usuario')
  }

  if (profile.credits_available <= 0) {
    return res.status(403).json({ error: 'No tienes créditos suficientes. Solicita más en el portal.' })
  }

  // 2. Construir el Prompt para Gemini
  const promptText = buildStoryPrompt({ nombre, edad, tema, usaFantasia });
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: promptText,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          titulo: { type: 'STRING', description: "El título del cuento" },
          paginas: {
            type: 'ARRAY',
            description: "Los 8 párrafos de la historia",
            items: {
              type: 'OBJECT',
              properties: {
                texto: { type: 'STRING' },
                emocion_visual: { type: 'STRING' }
              },
              required: ['texto', 'emocion_visual']
            }
          }
        },
        required: ['titulo', 'paginas']
      }
    }
  })

  const cuentoJSON = JSON.parse(response.text)

    // // 3. MOCK / DUMMY DATA (Simulacro para hacer pruebas de PDF)
    // console.log('🤖 Usando texto simulado (Gemini apagado)...');
    
    // // Simulamos que la API tardó 2 segundos en responder (opcional)
    // await new Promise(resolve => setTimeout(resolve, 2000));

    // const cuentoJSON = {
    //   titulo: `El gran reto de ${nombre}`,
    //   paginas: [
    //     { 
    //       texto: `Había una vez alguien muy especial llamado ${nombre}. A sus ${edad} años, le encantaba descubrir cosas nuevas todos los días.`, 
    //       emocion_visual: "feliz" 
    //     },
    //     { 
    //       texto: `Pero hoy era un día diferente. ${nombre} tenía que enfrentar un reto difícil que le hacía sentir algo raro en la pancita.`, 
    //       emocion_visual: "triste" 
    //     },
    //     { 
    //       texto: `De pronto, el viento sopló fuerte y una sombra oscura apareció en la pared de la habitación.`, 
    //       emocion_visual: "asustado" 
    //     },
    //     { 
    //       texto: `Recordando lo valiente que es, ${nombre} respiró profundo y se puso de pie, decidido a no retroceder.`, 
    //       emocion_visual: "valiente" 
    //     },
    //     { 
    //       texto: `En ese momento, apareció un pequeño pajarito brillante. 'No estás solo', pareció decirle con su dulce canto.`, 
    //       emocion_visual: "asombrado" 
    //     },
    //     { 
    //       texto: `${nombre} pensó que a veces los retos, como el de ${tema.replace('_', ' ')}, solo necesitan que los miremos con otros ojos.`, 
    //       emocion_visual: "pensativo" 
    //     },
    //     { 
    //       texto: `Y así lo hizo. Con una gran sonrisa, logró superarlo. Se sintió más fuerte y feliz que nunca.`, 
    //       emocion_visual: "feliz" 
    //     },
    //     { 
    //       texto: `Esa noche, ${nombre} se acurrucó en su cama, cerró los ojitos y durmió plácidamente. Todo estaba bien.`, 
    //       emocion_visual: "feliz" 
    //     }
    //   ]
    // };

    // 4. Transformar JSON a HTML y luego a PDF
  const html = generateZineHTML(cuentoJSON)
  const pdfBruto = await generatePDF(html) // Puppeteer devuelve un arreglo de números

      // NUEVO: Convertimos el arreglo a un Buffer real de Node.js
      const realBuffer = Buffer.from(pdfBruto)

      // 5. Cobrar el crédito
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits_available: profile.credits_available - 1 })
        .eq('id', userId)

      if (updateError) console.error('Error descontando crédito:', updateError)

      // 6. Preparar la Vista Digital
      const cuentoDigital = {
        ...cuentoJSON,
        paginas: cuentoJSON.paginas.map(p => ({
          ...p,
          svg: getIllustration(p.emocion_visual)
        }))
      }

      // 7. Enviar JSON. Ahora sí usamos realBuffer.
      res.json({
        cuento: cuentoDigital,
        pdfBase64: realBuffer.toString('base64') // ¡Ahora sí será un verdadero Base64!
      })

} catch (error) {
    console.error('Error en el proceso de generación:', error)
    
    // Detectamos si el error viene por saturación de Gemini (código 503)
    if (error.status === 503 || (error.message && error.message.includes('503'))) {
      return res.status(503).json({ 
        error: 'Nuestros servidores mágicos están muy ocupados en este momento. Por favor, espera un par de minutos e intenta de nuevo.' 
      })
    }

    res.status(500).json({ error: 'Error interno del servidor generando la historia' })
  }
})


app.post('/api/solicitar-creditos', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const userEmail = req.user.email;

  try {
    // 1. Marcar la solicitud en Supabase
    const { error: dbError } = await supabase
      .from('profiles')
      .update({ credit_requested: true })
      .eq('id', userId);

    if (dbError) throw dbError;

    // 2. Enviar el correo con Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Storyteller App <admin@beguka.com>', // Resend usa este correo de prueba por defecto
      to: [process.env.ADMIN_EMAIL],
      subject: '🔔 Solicitud de Créditos - Storyteller',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4A90E2;">Nueva solicitud de créditos</h2>
          <p>El usuario <strong>${userEmail}</strong> se ha quedado sin créditos y solicita una recarga.</p>
          <p>Por favor, ingresa al panel de administración para aprobarla.</p>
        </div>
      `
    });

    if (emailError) throw emailError;

    res.json({ success: true });
  } catch (error) {
    console.error('Error procesando solicitud de créditos:', error);
    res.status(500).json({ error: 'Error procesando la solicitud' });
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor de Storyteller corriendo en el puerto ${PORT}`)
})