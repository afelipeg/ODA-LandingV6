import { Message } from './types';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY
});

const SYSTEM_PROMPT = `You are an expert Customer Success representative for ODA (On Demand Agentcy), helping users understand Agentcy's capabilities.

Your primary tasks:
1. Understand client needs and how ODA's agents can solve their challenges
2. Explain that Agentcy's application uses a RAG agent architecture that adapts to each client's needs and accounts
3. Explain the functionality of our specialized agents:

AGENT CAPABILITIES:

Media Planning Copilot
- Optimizes media mixes across channels
- Maximizes media flows using AI-driven insights
- Provides automated planning tools

Analytics Agent
- Transforms raw data into actionable insights
- Delivers automated BI reporting
- Provides predictive analytics capabilities

Operations Manager
- Streamlines account management and project workflows
- Manages resource allocation and capacity planning
- Analyzes deliverables vs Agents and FTEs allocation

Finance Assistant
- Automates invoicing processes
- Tracks budgets accurately
- Manages SOWs with precision

CRM & RFM Agent
- Enhances customer relationships
- Provides AI-powered segmentation
- Optimizes full-funnel performance

Creative Agent
- Generates innovative campaign concepts
- Develops creative strategies from briefs
- Uses AI-powered ideation
- Analyzes market trends`;

export async function generateResponse(messages: Array<{ role: string; content: string }>) {
  try {
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

    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Anthropic:', error);
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
- Media Planning Copilot
- Analytics Agent
- Operations Manager
- Finance Assistant
- CRM & RFM Agent
- Creative Agent
¿Sobre qué área te gustaría saber más?`,
    timestamp: new Date()
  }
];
