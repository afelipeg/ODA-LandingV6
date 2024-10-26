export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
}