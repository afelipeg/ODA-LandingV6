import React, { createContext, useContext, useReducer } from 'react';
import { ChatState, ChatAction, ChatContextType, ChatProviderProps } from './types';

const initialState: ChatState = {
  messages: [{
    id: '1',
    role: 'assistant',
    content: `¡Hola! Soy el asistente especializado de ODA (On-Demand-Agentcy). 
Puedo ayudarte a explorar cómo nuestros agentes especializados con arquitectura RAG pueden transformar tu agencia:
- Media Planning Copilot
- Analytics Agent
- Operations Manager
- Finance Assistant
- CRM & RFM Agent
- Creative Agent
¿Sobre qué área te gustaría saber más?`,
    timestamp: new Date()
  }],
  isLoading: false,
  error: null,
  userInfo: {}
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    case 'CLEAR_CHAT':
      return {
        ...initialState,
        userInfo: state.userInfo
      };
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, {
    ...initialState,
    messages: [{
      id: '1',
      role: 'assistant',
      content: `¡Hola! Soy el agente especializado de ODA (On-Demand-Agentcy). 
Puedo ayudarte a explorar cómo nuestros agentes especializados con arquitectura RAG y frameworks agentic pueden transformar tu agencia:
- Media Planning Agents
- Analytics Agent
- Operations Manager
- Finance Assistant
- CRM & RFM Agent
- Creative Agent
¿Sobre qué área te gustaría saber más?`,
      timestamp: new Date()
    }]
  });

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
