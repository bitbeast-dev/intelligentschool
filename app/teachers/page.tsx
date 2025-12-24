'use client';

import Sidebar from '../Sidebar';
import { FaBars, FaMicrophone, FaRobot, FaPaperPlane, FaVolumeUp, FaStop } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function AIAssistant() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI Teaching Assistant. Ask me anything about student performance, attendance, or classroom analytics.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiResponses: any = {
    'attendance': 'Current attendance rate is 92%. Top performers: Grade 10A (97%), Grade 11B (95%). Grade 11A needs attention at 85%.',
    'performance': 'Overall student performance: 87% average. 45% students scoring 90+, 35% scoring 80-89, 15% scoring 70-79, 5% below 70.',
    'behavior': 'Classroom behavior is excellent in 60% of classes, good in 30%, and needs improvement in 10%. Focus levels are highest between 9-11 AM.',
    'teacher': 'Teacher engagement average: 89%. Dr. Sarah Johnson leads with 95% engagement. Professional development completion: 78%.',
    'environment': 'Classroom conditions optimal: Temperature 22°C, Humidity 45%, CO2 levels normal at 650ppm, Lighting 450 lux.',
    'default': 'I can help you with: Student Performance, Attendance Tracking, Behavior Analysis, Teacher Analytics, Environment Monitoring, Class Management, and Predictive Insights.'
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const keyword = Object.keys(aiResponses).find(key => input.toLowerCase().includes(key));
      const response = aiResponses[keyword || 'default'];
      const aiMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, aiMessage]);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 1.1;
        utterance.pitch = 1;
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);
    
    setInput('');
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('Listening...');
    
    setTimeout(() => {
      const sampleQueries = [
        'What is the current attendance rate?',
        'Show me student performance metrics',
        'How is classroom behavior today?',
        'Tell me about teacher engagement',
        'What are the environment conditions?'
      ];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setTranscript(randomQuery);
      setInput(randomQuery);
      setIsListening(false);
    }, 2000);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Sidebar />
      <div className="lg:ml-72">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
                  <FaBars className="text-xl text-slate-600" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center">
                    <FaRobot className="mr-3 text-cyan-600" />
                    AI Voice Assistant
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Voice-activated intelligent teaching assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isSpeaking && (
                  <button onClick={stopSpeaking} className="px-4 py-2 bg-red-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2 animate-pulse">
                    <FaStop />
                    Stop Speaking
                  </button>
                )}
                <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  AI Online
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90">Voice Commands</p>
              <p className="text-3xl font-bold mt-2">{messages.filter(m => m.role === 'user').length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90">AI Responses</p>
              <p className="text-3xl font-bold mt-2">{messages.filter(m => m.role === 'assistant').length}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90">Accuracy</p>
              <p className="text-3xl font-bold mt-2">98%</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90">Response Time</p>
              <p className="text-3xl font-bold mt-2">0.8s</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl p-4 ${message.role === 'user' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {message.role === 'assistant' && <FaRobot className="text-cyan-600" />}
                      <span className="font-semibold text-sm">{message.role === 'user' ? 'You' : 'AI Assistant'}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-200 p-4 bg-slate-50">
              {isListening && (
                <div className="mb-4 p-4 bg-cyan-100 border border-cyan-300 rounded-xl flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-600 rounded-full animate-ping"></div>
                  <span className="text-cyan-900 font-medium">{transcript}</span>
                </div>
              )}
              
              <div className="flex gap-2">
                <button onClick={startListening} disabled={isListening} className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${isListening ? 'bg-slate-300 text-slate-500' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg'}`}>
                  <FaMicrophone className={isListening ? 'animate-pulse' : ''} />
                  {isListening ? 'Listening...' : 'Voice Input'}
                </button>
                
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your question or use voice..." className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                
                <button onClick={handleSend} className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-lg font-medium flex items-center gap-2">
                  <FaPaperPlane />
                  Send
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Show attendance', 'Student performance', 'Behavior analysis', 'Teacher metrics', 'Environment status'].map((suggestion) => (
                  <button key={suggestion} onClick={() => setInput(suggestion)} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-slate-50 hover:border-cyan-300 transition-colors">
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">🎤 Voice Commands</h3>
              <p className="text-sm text-blue-700">Use natural language to query any school data instantly</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-bold text-purple-900 mb-2">🤖 AI Powered</h3>
              <p className="text-sm text-purple-700">Advanced NLP understands context and provides intelligent responses</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
              <h3 className="font-bold text-emerald-900 mb-2">🔊 Text-to-Speech</h3>
              <p className="text-sm text-emerald-700">Hear responses with natural voice synthesis technology</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
