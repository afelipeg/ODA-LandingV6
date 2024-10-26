import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { Message } from './types';

const AgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your Agentcy assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string) => {
    const responses = {
      default: "I'll help you explore our agency capabilities. What specific area would you like to know more about?",
      pricing: "Our pricing is value-based and typically results in 70% cost savings compared to traditional agencies. Would you like to see a detailed breakdown?",
      services: "We offer a full suite of agency services powered by AI, including media planning, analytics, operations, finance, and creative. Which area interests you most?",
      demo: "I'd be happy to arrange a demo. You can schedule one using our form above, or I can tell you more about our capabilities first.",
    };

    const message = userMessage.toLowerCase();
    if (message.includes('price') || message.includes('cost')) {
      return responses.pricing;
    } else if (message.includes('service') || message.includes('offer')) {
      return responses.services;
    } else if (message.includes('demo') || message.includes('schedule')) {
      return responses.demo;
    }
    return responses.default;
  };

  const handleSubmit = async (inputMessage: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div 
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Chat with our AI Agent
          </h2>
          <p className="text-xl text-gray-300">
            Explore how we can help your agency grow
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ChatMessages 
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default AgentChat;