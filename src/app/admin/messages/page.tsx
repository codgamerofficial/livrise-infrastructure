'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  MessageSquare,
  Send,
  Briefcase,
  User,
  Search,
  CheckCheck,
} from 'lucide-react';

export default function AdminMessagesHubPage() {
  const { messages, projects, clients, sendMessage, currentUser } = useLivRiseStore();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [search, setSearch] = useState('');

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const projectMessages = messages.filter((m) => m.projectId === currentProject?.id);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentProject) return;

    sendMessage(currentProject.id, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase text-amber-400">Communication Center</span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Client Messaging Hub</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Real-time correspondence with client representatives across all commissioned sites.
        </p>
      </div>

      {/* Chat Pane */}
      <div className="liquid-glass rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row h-[600px]">
        {/* Project Channels Sidebar */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-black/40">
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or clients..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filteredProjects.map((p) => {
              const isSelected = p.id === currentProject?.id;
              const msgs = messages.filter((m) => m.projectId === p.id);
              const lastMsg = msgs[msgs.length - 1];

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`w-full p-4 text-left transition-all ${
                    isSelected ? 'bg-amber-400/10 border-l-2 border-amber-400' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate block">
                      {p.title}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      {msgs.length} msgs
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 block mt-0.5 truncate">
                    Client: {p.clientName}
                  </span>
                  {lastMsg && (
                    <p className="text-[11px] text-zinc-500 truncate mt-1">
                      {lastMsg.messageText}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation Right Pane */}
        <div className="flex-1 flex flex-col bg-black/60 min-w-0">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                {currentProject?.title}
              </h2>
              <p className="text-[11px] text-zinc-400">
                Client Representative: {currentProject?.clientName} • Code: {currentProject?.projectCode}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Channel
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {projectMessages.length > 0 ? (
              projectMessages.map((m) => {
                const isAdmin = m.senderRole === 'admin' || m.senderRole === 'super_admin' || m.senderId === currentUser.id;
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-mono text-zinc-400">
                      <span>{m.senderName}</span>
                      <span>•</span>
                      <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isAdmin
                          ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none shadow-sm'
                          : 'bg-white/10 text-white rounded-tl-none border border-white/10'
                      }`}
                    >
                      {m.messageText}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                No messages recorded for this project yet. Send a transmittal update below.
              </div>
            )}
          </div>

          {/* Reply Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-white/10 bg-black/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Send engineering transmittal or status update to client..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
