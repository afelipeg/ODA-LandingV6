import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, User, Bot, Loader2, Calendar, Brain, Database, Sparkles } from 'lucide-react';
import { useChat } from './ChatContext';
import { generateResponse } from './chatService';
import { nanoid } from 'nanoid';

const AGENT_SUGGESTIONS = [
  { id: 'media', label: 'Media Planning', icon: Brain },
  { id: 'analytics', label: 'Analytics', icon: Database },
  { id: 'creative', label: 'Creative', icon: Sparkles },
];

const AgentChat = () => {
  const { state, dispatch } = useChat();
  const [inputMessage, setInputMessage] = useState('');
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
  }, [state.messages]);

  const handleAgentSelect = (agentType: string) => {
    const message = `Me gustaría saber más sobre el agente de ${agentType}`;
    handleSubmit(message);
  };

  const handleSubmit = async (messageContent: string) => {
    if (!messageContent.trim() || state.isLoading) return;

    const userMessage = {
      id: nanoid(),
      role: 'user' as const,
      content: messageContent,
      timestamp: new Date()
    };

    // Primero actualizamos el estado con el mensaje del usuario
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });
    setInputMessage('');

    try {
      // Creamos un array actualizado con todos los mensajes incluyendo el nuevo
      const updatedMessages = [...state.messages, userMessage];
      
      // Enviamos todos los mensajes al servicio
      const response = await generateResponse(
        updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      );

      // Añadimos la respuesta del asistente
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: nanoid(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('Error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta de nuevo.'
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      scrollToBottom();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(inputMessage);
  };

  const handleBookDemo = () => {
    const demoSection = document.getElementById('beta');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
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
            Descubre el poder de nuestros Agentes IA
          </h2>
          <p className="text-xl text-gray-300">
            Optimiza tu agencia con nuestra arquitectura RAG personalizada
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {state.messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${message.role === 'user' ? 'bg-black' : 'bg-blue-600'}`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                <div className={`max-w-[80%] rounded-2xl px-4 py-2 
                  ${message.role === 'user' 
                    ? 'bg-black text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-900 rounded-tl-none'
                  }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  {message.role === 'assistant' && message.content.toLowerCase().includes('demo') && (
                    <button
                      onClick={handleBookDemo}
                      className="mt-2 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Agendar Demo</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {state.isLoading && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {AGENT_SUGGESTIONS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => handleAgentSelect(agent.label)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <agent.icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{agent.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                disabled={state.isLoading}
              />
              <button
                type="submit"
                disabled={state.isLoading || !inputMessage.trim()}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AgentChat;
