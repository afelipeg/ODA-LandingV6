import { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
  defaultHeaders: {
    'anthropic-version': '2023-06-01'
  }
});

const SYSTEM_PROMPT = `Eres un asistente especializado de ODA (On-Demand-Agentcy), una agencia impulsada por agentes LLM con frameworks RAG y patrones agentic (reflection, planning, multiagent and tool use) para optimizar operaciones y aumentar la geenracion de ingresos.
Nuestros agentes especializados con arquitectura RAG & Multiagent incluyen:
1. Media Planning Copilot
- Optimización de mix de medios y creacion de flows maximizados de medios digitales/offline
- Planificación automatizada
- Insights en tiempo real
- Consideracion de restricciones de tarifas, industrias, negociaciones

2. Analytics Agent
- Reportes automatizados de BI
- Análisis e insights para optimizaciones de planes de medios

3. Operations Manager
- Gestión de flujos de trabajo
- Asignación de recursos
- Planificación de capacidad
- Project management
- Gestion financiera de proyectos

4. Finance Assistant
- Automatización de facturación
- Control de presupuestos
- Gestión de SOWs

5. CRM & RFM Agent
- Creacion de segmentos de audiencias
- Analisis y creacion de modelos RFP
- Optimización growth loops
- Creacion de journeys automatizados para implementar en SFMC

6. Creative Agent
- Generación de conceptos
- Análisis de tendencias
- Optimización creativa

Directrices:
- Mantén respuestas concisas (2-3 oraciones)
- Enfócate en beneficios concretos
- Explique en que consisten los enfoques de RAG y los frameworks de patrones agentic cuando sea necesario
- Responda en ingles o español dependiendo del idioma con el que interactue el humano
- Si le preguntan por el costo responda que inicia con USD$15,000 dolares mensuales.
- Menciona el ahorro del 70% en costos cuando sea relevante
- Guía hacia el demo cuando detectes interés
- Mantén un tono profesional pero cercano
- Usa ejemplos específicos de la industria`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

export const handler: Handler = async (event) => {
  // Validate HTTP method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    };
  }

  try {
    // Parse and validate request body
    const { messages } = JSON.parse(event.body || '{}') as RequestBody;
    if (!Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid messages format' }),
        headers: { 
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      };
    }

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      temperature: 0.7,
      messages: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      system: SYSTEM_PROMPT
    });

    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        message: response.content[0].text
      }),
    };

  } catch (error) {
    // Log error for debugging
    console.error('Error processing chat request:', error);

    // Return appropriate error response
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request format' }),
        headers: { 
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      };
    }

    // Handle Anthropic API errors
    if (error instanceof Anthropic.APIError) {
      return {
        statusCode: error.status || 500,
        body: JSON.stringify({ 
          error: 'Error communicating with AI service',
          details: error.message
        }),
        headers: { 
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      };
    }

    // Generic error response
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
      }),
      headers: { 
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    };
  }
};
