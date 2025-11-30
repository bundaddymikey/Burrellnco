import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I\'m your Burrell & Co. assistant. I can help you choose the perfect detailing package. What kind of vehicle do you have?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage.text);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
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

  const QuickChip = ({ label, query }: { label: string, query: string }) => (
    <button 
      onClick={() => handleSend(query)}
      className="whitespace-nowrap px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-gold hover:bg-brand-gold hover:text-black transition-colors"
    >
      {label}
    </button>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-4 md:bottom-24 md:right-8 w-[350px] h-[500px] bg-brand-dark border border-brand-gold/30 shadow-2xl z-50 flex flex-col rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-gold rounded-full">
                  <Sparkles size={16} className="text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Burrell & Co. Assistant</h3>
                  <p className="text-xs text-brand-gold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    AI Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-brand-dark/50 scrollbar-thin">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-brand-gold text-black font-medium rounded-br-none' 
                        : 'bg-black text-gray-200 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-black p-3 rounded-2xl rounded-bl-none border border-white/10">
                    <Loader2 size={16} className="animate-spin text-brand-gold" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 bg-black/50 overflow-x-auto flex gap-2 scrollbar-none border-t border-white/5">
               <QuickChip label="Price for SUV?" query="How much for a full interior detail on an SUV?" />
               <QuickChip label="I have a Tesla" query="What is the best package for my Tesla Model Y?" />
               <QuickChip label="Engine cleaning?" query="Do you clean engine bays?" />
               <QuickChip label="Maintenance?" query="Tell me about maintenance washes." />
            </div>

            {/* Input */}
            <div className="p-4 bg-black border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-grow bg-brand-dark border border-gray-700 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:border-brand-gold"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-brand-gold text-black p-2 rounded-full hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 bg-brand-gold text-black rounded-full shadow-[0_0_20px_rgba(255,195,0,0.4)] flex items-center justify-center z-50 hover:bg-yellow-400 transition-colors"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </>
  );
};