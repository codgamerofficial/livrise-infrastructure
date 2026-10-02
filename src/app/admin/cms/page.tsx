'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  Layers,
  Award,
  Users,
  MessageSquare,
  BarChart3,
  CheckCircle,
  Edit3,
  Save,
  Plus,
} from 'lucide-react';

export default function AdminCMSPage() {
  const { statistics, services, awards, team, testimonials, updateStatistic } = useLivRiseStore();

  const [activeTab, setActiveTab] = useState<'stats' | 'services' | 'awards' | 'team'>('stats');

  // Stats edit state
  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [statVal, setStatVal] = useState<string>('');
  const [statNum, setStatNum] = useState<number>(0);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleSaveStat = (id: string) => {
    updateStatistic(id, statVal, statNum);
    setEditingStatId(null);
    setSavedMessage('Trust metric successfully updated in live CMS system.');
    setTimeout(() => setSavedMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-400" />
            CONTENT MANAGEMENT STUDIO (CMS)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Dynamic content control, verified trust metrics, service descriptions, and awards governance.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-2">
        {[
          { key: 'stats', label: 'Verified Trust Metrics', icon: BarChart3, count: statistics.length },
          { key: 'services', label: 'Engineering Services', icon: Layers, count: services.length },
          { key: 'awards', label: 'National Awards', icon: Award, count: awards.length },
          { key: 'team', label: 'Engineering Team & Advisors', icon: Users, count: team.length },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 px-4 text-xs font-mono font-medium border-b-2 flex items-center gap-2 transition-all ${
                activeTab === tab.key
                  ? 'border-amber-400 text-amber-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded bg-white/5 text-[10px]">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* STATS CMS TAB */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-300/80 font-mono">
            ⚠️ PHASE 7 COMPLIANCE: All public stats on the homepage and about page reflect these verified CMS values.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statistics.map((stat) => (
              <div
                key={stat.id}
                className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    {stat.key}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-xs text-slate-400">{stat.label}</h3>
                  {editingStatId === stat.id ? (
                    <div className="space-y-2 mt-2">
                      <input
                        type="text"
                        value={statVal}
                        onChange={(e) => setStatVal(e.target.value)}
                        placeholder="Display Value (e.g. 2.5M+)"
                        className="w-full p-2 rounded-lg bg-[#070b14] border border-white/10 text-white font-mono text-xs"
                      />
                      <input
                        type="number"
                        value={statNum}
                        onChange={(e) => setStatNum(Number(e.target.value))}
                        placeholder="Numeric Value (e.g. 2500000)"
                        className="w-full p-2 rounded-lg bg-[#070b14] border border-white/10 text-white font-mono text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingStatId(null)}
                          className="px-2.5 py-1 rounded bg-white/5 text-slate-400 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveStat(stat.id)}
                          className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold text-xs"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-bold font-mono text-white">
                        {stat.valueDisplay}
                      </span>
                      <button
                        onClick={() => {
                          setEditingStatId(stat.id);
                          setStatVal(stat.valueDisplay);
                          setStatNum(stat.numericValue);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-400 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES CMS TAB */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {srv.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">/{srv.slug}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{srv.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{srv.shortDescription || srv.summary || srv.description}</p>
                <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
                  {srv.capabilities.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AWARDS CMS TAB */}
      {activeTab === 'awards' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((aw) => (
              <div
                key={aw.id}
                className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                    {aw.position}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{aw.year}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{aw.title}</h3>
                <p className="text-xs text-slate-400 font-mono">By: {aw.organization}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{aw.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEAM CMS TAB */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {m.department}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    {m.experience || m.experienceYears}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{m.name}</h3>
                <p className="text-xs text-amber-400/90 font-mono">{m.position}</p>
                <p className="text-[11px] text-slate-400 font-mono">{m.education}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
