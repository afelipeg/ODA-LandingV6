import { Message } from './types';

interface ChatResponse {
  message: string;
}

interface ChatError {
  error: string;
  details?: string;
}

export async function generateResponse(messages: Array<{ role: string; content: string }>) {
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json() as ChatResponse | ChatError;

    if (!response.ok) {
      throw new Error('error' in data ? data.error : 'Error en el servicio de chat');
    }

    if ('error' in data) {
      throw new Error(data.error);
    }

    return data.message;
  } catch (error) {
    console.error('Error calling chat function:', error);
    if (error instanceof Error) {
      throw new Error(`Error en el servicio de chat: ${error.message}`);
    }
    throw new Error('Error inesperado en el servicio de chat');
  }
}

export const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: `¡Hola! Soy el asistente de ODA (On-Demand-Agentcy). 

Puedo ayudarte a explorar cómo nuestros agentes especializados con arquitectura RAG pueden transformar tu agencia:

• Media Planning Copilot
• Analytics Agent
• Operations Manager
• Finance Assistant
• CRM & RFM Agent
• Creative Agent

¿Sobre qué área te gustaría saber más?`,
    timestamp: new Date()
  }
];