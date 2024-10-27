export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  userInfo: {
    name?: string;
    email?: string;
    company?: string;
  };
}

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER_INFO'; payload: Partial<ChatState['userInfo']> }
  | { type: 'CLEAR_CHAT' }
  | { type: 'UPDATE_MESSAGES'; payload: Message[] };

export type ChatContextType = {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
};

export interface ChatProviderProps {
  children: React.ReactNode;
}
