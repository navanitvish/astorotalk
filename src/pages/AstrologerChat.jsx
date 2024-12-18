import React, { useState } from 'react';
import { Send, Moon, Stars, Sun } from 'lucide-react';

const AstrologerChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'astrologer',
      text: "Welcome to the Celestial Chat! I'm your cosmic guide. What would you like to know about your stars?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage]);
    
    // Simulate astrologer response
    setTimeout(() => {
      const astrologerResponse = {
        id: messages.length + 2,
        sender: 'astrologer',
        text: 'The stars are aligning to provide you guidance. Let me consult the cosmic energies...',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prevMessages => [...prevMessages, astrologerResponse]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-red-50">
      {/* Header */}
      <div className="bg-red-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Moon className="text-yellow-300" size={24} />
          <h1 className="text-xl font-semibold">Celestial Chat Room</h1>
        </div>
        <Stars className="text-red-300" size={24} />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-red-900'
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about your cosmic destiny..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AstrologerChat;