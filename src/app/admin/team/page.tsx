'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  Users,
  Shield,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export default function AdminTeamPage() {
  const { team, currentUser } = useLivRiseStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase text-amber-400">Governance & Directory</span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Technical Leadership & Staff</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Engineering leads, registered architects, and project managers overseeing infrastructure delivery.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-3xl liquid-glass border border-white/10 bg-black/60 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center text-base font-mono border border-amber-400/30">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{member.name}</h3>
                  <p className="text-xs text-amber-400 font-medium">{member.position}</p>
                  <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                    {member.department}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {member.biography}
              </p>

              {member.expertise && member.expertise.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Experience: {member.experienceYears || '10+'} Years</span>
              <span className="text-emerald-400 font-mono text-[10px]">Active Lead</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
