import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Minimize2, MessageSquare } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Aura, your MNR personal stylist. How can I help you elevate your wardrobe today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Create a placeholder for the model response
    setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

    try {
      const streamResult = await sendMessageToGemini(userMessage);
      
      let fullText = '';
      
      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            fullText += c.text;
            // Update the last message with the accumulating text
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg.role === 'model' && lastMsg.isStreaming) {
                    lastMsg.text = fullText;
                }
                return newMessages;
            });
        }
      }
      
      // Finalize the message
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        lastMsg.isStreaming = false;
        return newMessages;
      });

    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting to the styling service right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-mnr-black text-white p-4 rounded-full shadow-2xl hover:bg-mnr-gold transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-2"
          aria-label="Open AI Assistant"
        >
          <Sparkles size={24} />
          <span className="hidden md:inline font-medium">Ask Aura</span>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-[90vw] sm:max-w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-mnr-black p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-mnr-gold rounded-full">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-serif font-medium">Aura Stylist</h3>
                <p className="text-xs text-gray-300">Powered by Gemini</p>
              </div>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-mnr-black text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.role === 'model' ? (
                     <div className="prose prose-sm max-w-none prose-a:text-mnr-gold prose-strong:text-mnr-black">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                     </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
             {isLoading && messages[messages.length-1]?.role === 'user' && (
               <div className="flex justify-start">
                 <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                 </div>
               </div>
             )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:ring-1 focus-within:ring-mnr-black focus-within:border-mnr-black transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask for style advice..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-full transition-colors ${
                  input.trim() && !isLoading
                    ? 'text-mnr-gold hover:bg-mnr-gold/10'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 text-center">
                 <p className="text-[10px] text-gray-400">Aura can make mistakes. Please check important info.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;