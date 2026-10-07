'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import {
  MessageSquare,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Shield,
  Clock,
  Sparkles,
  Phone,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';
import { supabase } from '@/lib/supabase';

export default function ClientMessagesPage() {
  const { user } = useAuth();
  const { messages, projects, sendMessage } = useLivRiseStore();

  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'prj-1');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Subscribe to Supabase Realtime channel for live messages
  useEffect(() => {
    try {
      const channel = supabase
        .channel(`project-messages-${activeProjectId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `project_id=eq.${activeProjectId}`,
          },
          (payload) => {
            console.log('Realtime message received:', payload);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('Realtime subscription skipped:', err);
    }
  }, [activeProjectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(activeProject.id, inputText.trim());
    setInputText('');
  };

  const projectMessages = messages.filter((m) => m.projectId === activeProject?.id);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Encrypted Technical Channel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            LivRise Engineering Desk
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Direct communication with assigned civil engineers, architects, and project managers.
          </p>
        </div>

        <a
          href={getWhatsAppLink('Hello LivRise engineering team, I have an urgent query on my project: ')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Switch to WhatsApp Live</span>
        </a>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-137.5">
        {/* Left: Project Channel Selector */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Active Project Channels
          </span>

          <div className="space-y-2">
            {projects.map((prj) => {
              const isSelected = prj.id === activeProject?.id;
              const unread = messages.filter((m) => m.projectId === prj.id && !m.isRead).length;

              return (
                <button
                  key={prj.id}
                  type="button"
                  onClick={() => setActiveProjectId(prj.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400/40 text-white'
                      : 'bg-[#0c1222] border-white/5 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-amber-400 font-bold">{prj.projectCode}</span>
                    {unread > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                        {unread}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-white truncate">{prj.title}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{prj.stage || 'Design'} Stage</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Message Feed & Input Box */}
        <div className="lg:col-span-3 rounded-3xl bg-[#0c1222] border border-white/5 flex flex-col justify-between overflow-hidden">
          {/* Channel Header */}
          <div className="p-4 sm:p-5 border-b border-white/5 bg-white/1 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">{activeProject?.title}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-400">
                  {activeProject?.projectCode}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                Assigned Team: Iman Khanra (Lead Engineer) • Support Desk
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Desk Online</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 max-h-105">
            {projectMessages.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No messages yet. Send a query below to start communicating with the LivRise team.
              </div>
            ) : (
              projectMessages.map((msg) => {
                const isClient = msg.senderRole === 'client' || msg.senderId === user?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-md ${isClient ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <span className="text-[10px] font-mono text-zinc-500 mb-1 px-1">
                      {msg.senderName}
                    </span>
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed space-y-1 shadow-sm ${
                        isClient
                          ? 'bg-amber-400 text-slate-950 font-medium rounded-br-xs'
                          : 'bg-white/5 border border-white/10 text-zinc-200 rounded-bl-xs'
                      }`}
                    >
                      <p>{msg.messageText}</p>
                      <div
                        className={`flex items-center justify-end gap-1 text-[9px] font-mono pt-1 ${
                          isClient ? 'text-slate-800' : 'text-zinc-500'
                        }`}
                      >
                        <span>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {isClient && <CheckCheck className="w-3 h-3 text-slate-800" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Form */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 border-t border-white/5 bg-white/1 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Write a message to your LivRise engineering team..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-amber-400/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 disabled:opacity-40 transition-colors flex items-center gap-2 shadow-md shadow-amber-400/10"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
