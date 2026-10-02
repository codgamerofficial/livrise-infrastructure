'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCheck,
  Briefcase,
  Phone,
  Search,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';

export default function ClientMessagesPage() {
  const { messages, projects, currentUser, sendMessage } = useLivRiseStore();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'all');
  const [inputText, setInputText] = useState('');

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Filter messages for selected project
  const projectMessages = selectedProjectId === 'all'
    ? messages
    : messages.filter((m) => m.projectId === selectedProjectId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(currentProject?.id || 'prj-general', inputText);
    setInputText('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 h-[calc(100vh-120px)] md:h-[calc(100vh-50px)] flex flex-col animate-in fade-in duration-300">
      {/* Messages Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-light text-white tracking-tight">
            Project Conversations
          </h1>
          <p className="text-xs text-zinc-400">
            Direct channel with LivRise structural engineers and architects.
          </p>
        </div>

        <a
          href={getWhatsAppLink(`Hello LivRise Team, this is ${currentUser.name}. Checking in on project messages.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>WhatsApp Sync</span>
        </a>
      </div>

      {/* Main Chat Split View (Channels on left, Chat on right on desktop) */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 pt-3 min-h-0">
        {/* Project Selector (Mobile: horizontal chips, Desktop: sidebar) */}
        <div className="md:w-72 shrink-0 flex md:flex-col gap-2 overflow-x-auto no-scrollbar md:overflow-y-auto pb-1 md:pb-0">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider hidden md:block px-2 mb-1">
            Active Channels
          </div>

          {projects.map((p) => {
            const isSelected = selectedProjectId === p.id;
            const projectMsgs = messages.filter((m) => m.projectId === p.id);
            const lastMsg = projectMsgs[projectMsgs.length - 1];

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProjectId(p.id)}
                className={`flex-1 md:flex-none p-3 rounded-2xl text-left transition-all whitespace-nowrap md:whitespace-normal ${
                  isSelected
                    ? 'bg-white text-black font-medium shadow-lg'
                    : 'liquid-glass border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold truncate block">
                    {p.title}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                {lastMsg && (
                  <p
                    className={`text-[11px] truncate mt-1 hidden md:block ${
                      isSelected ? 'text-zinc-700' : 'text-zinc-500'
                    }`}
                  >
                    {lastMsg.messageText}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Chat Conversation Pane */}
        <div className="flex-1 flex flex-col liquid-glass rounded-3xl border border-white/10 overflow-hidden bg-black/60">
          {/* Channel Top Info */}
          <div className="p-3.5 sm:p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  {currentProject?.title || 'Project Channel'}
                </h3>
                <span className="text-[10px] text-zinc-400">
                  Engineering Desk • Response SLA: Within 2 hours
                </span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-zinc-500">
              {projectMessages.length} Messages
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {projectMessages.length > 0 ? (
              projectMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-mono text-zinc-400">
                        {msg.senderName}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-amber-500/20 border border-amber-500/30 text-white rounded-tr-none'
                          : 'bg-white/10 border border-white/10 text-zinc-200 rounded-tl-none'
                      }`}
                    >
                      {msg.messageText}
                    </div>

                    <div className="flex items-center gap-1 mt-0.5 px-1 text-[9px] text-zinc-500">
                      <CheckCheck className="w-3 h-3 text-amber-400" />
                      <span>Delivered</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 text-xs">
                <MessageSquare className="w-8 h-8 text-zinc-600 mb-2" />
                <span>No messages in this project channel yet.</span>
                <span className="text-[11px] text-zinc-600 mt-0.5">
                  Type a note below to start the conversation with your lead engineer.
                </span>
              </div>
            )}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-white/10 bg-black/80 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={() => alert('Attachments: upload drawing or photo in next update or via Document Vault.')}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message LivRise team about ${currentProject?.title || 'project'}...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
            />

            <button
              type="submit"
              className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-sm"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
