import React, { createContext, useContext, useReducer } from 'react';
import { ChatState, ChatAction, ChatContextType, ChatProviderProps } from './types';

const initialState: ChatState = {
  messages: [{
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your Agentcy assistant. How can I help you today?",
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
    default:
      return state;
  }
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

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