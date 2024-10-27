import { Message } from './types';

// El SYSTEM_PROMPT lo movemos a la función Netlify
export async function generateResponse(messages: Array<{ role: string; content: string }>) {
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': import.meta.env.VITE_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en el servicio de chat');
    }

    const data = await response.json();
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
    content: `¡Hi! Im ODA (On-Demand-Agentcy) customer success agent. 
Can I help you to explore our crew of RAG agents to improve your agency to the next level:
- Media Planning Copilot
- Analytics Agent
- Operations Manager
- Finance Assistant
- CRM & RFM Agent
- Creative Agent
¿On which one you want to make a deep-dive?`,
    timestamp: new Date()
  }
];
