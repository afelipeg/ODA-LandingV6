import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessageProps } from './types';

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={`flex items-start space-x-2 ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        ${isUser ? 'bg-black' : 'bg-blue-600'}`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      <div className={`max-w-[80%] rounded-2xl px-4 py-2 
        ${isUser 
          ? 'bg-black text-white rounded-tr-none' 
          : 'bg-gray-100 text-gray-900 rounded-tl-none'
        }`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-50 mt-1 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;