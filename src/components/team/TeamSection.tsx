'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap, Compass, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
}

export interface TeamMemberProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  education: EducationEntry[];
  published?: boolean;
  displayOrder?: number;
}

/**
 * Verified LivRise Team Profiles
 * STRICT POLICY: Only verified LivRise personnel with accurate credentials.
 */
export const LIVRISE_TEAM_MEMBERS: TeamMemberProfile[] = [
  {
    id: 'iman-khanra',
    name: 'Iman Khanra',
    role: 'Civil Engineering',
    image: '/team/iman-khanra.jpg',
    bio: 'Iman Khanra is a Civil Engineering professional with an academic background spanning B.Tech in Civil Engineering from Techno India University and a Diploma in Civil Engineering from Contai Polytechnic. At LivRise Infrastructure, his engineering foundation contributes to a practical approach toward planning, design and the built environment.',
    education: [
      {
        degree: 'B.Tech',
        field: 'Civil Engineering',
        institution: 'Techno India University',
      },
      {
        degree: 'Diploma',
        field: 'Civil Engineering',
        institution: 'Contai Polytechnic',
      },
    ],
    published: true,
    displayOrder: 1,
  },
];

interface TeamSectionProps {
  className?: string;
  members?: TeamMemberProfile[];
}

export function TeamSection({
  className = '',
  members = LIVRISE_TEAM_MEMBERS,
}: TeamSectionProps) {
  const publishedMembers = members.filter((m) => m.published !== false);

  if (publishedMembers.length === 0) return null;

  return (
    <section
      id="team"
      className={`py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-brand-obsidian relative overflow-hidden ${className}`}
      aria-label="The LivRise Team"
    >
      {/* Background Architectural Blueprint Aesthetics */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-brand-gold-bright/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-charcoal border border-brand-gold/30 text-brand-gold-bright text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-brand-gold-bright" />
            <span>The LivRise Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Built on Engineering.{' '}
            <span className="gold-gradient-text">Driven by Vision.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Meet the engineering foundation behind LivRise Infrastructure. Every blueprint,
            structural detail, and construction milestone is anchored in technical precision.
          </p>
        </div>

        {/* Team Members List (Reusable Architecture) */}
        <div className="space-y-16">
          {publishedMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-brand-gold/30 bg-brand-charcoal/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl shadow-black/80 relative overflow-hidden"
            >
              {/* Architectural Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-brand-gold to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
                {/* ===================================================================
                    PROFILE PHOTO (Left Column on Desktop, First on Mobile)
                    =================================================================== */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative group w-full max-w-md sm:max-w-lg lg:max-w-none">
                    {/* Architectural Frame Border with Subtle Gold Glow */}
                    <div className="relative rounded-3xl p-1.5 sm:p-2 bg-linear-to-b from-brand-gold/40 via-zinc-800 to-zinc-900 shadow-2xl border border-brand-gold/30">
                      <div className="relative aspect-3/4 sm:aspect-4/5 lg:aspect-3/4 w-full rounded-2xl overflow-hidden bg-brand-obsidian">
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.role}, LivRise Infrastructure`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                          priority
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />

                        {/* Subtle bottom vignette to blend naturally */}
                        <div className="absolute inset-0 bg-linear-to-t from-brand-charcoal/90 via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Floating Role Pill Badge */}
                        <div className="absolute bottom-4 left-4 right-4 z-10">
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-obsidian/90 backdrop-blur-md border border-brand-gold/40 text-brand-gold-bright text-xs font-semibold shadow-lg">
                            <ShieldCheck className="w-4 h-4 text-brand-gold-bright shrink-0" />
                            <span className="truncate">{member.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Decorative Geometry Corner Accents */}
                    <div className="hidden sm:block absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-brand-gold-bright/60 rounded-tl pointer-events-none" />
                    <div className="hidden sm:block absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-brand-gold-bright/60 rounded-br pointer-events-none" />
                  </div>
                </div>

                {/* ===================================================================
                    PROFILE DETAILS (Right Column on Desktop, Below on Mobile)
                    =================================================================== */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                  {/* Name & Role */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-brand-gold-bright uppercase">
                      <span>Verified Team Member</span>
                      <span className="w-1 h-1 rounded-full bg-brand-gold-bright" />
                      <span>LivRise Infrastructure</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      {member.name}
                    </h3>

                    <div className="text-base sm:text-lg font-semibold text-brand-gold-bright">
                      {member.role}
                    </div>

                    {/* Animated Gold Architectural Divider */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="h-0.5 bg-linear-to-r from-brand-gold to-brand-gold-bright rounded-full"
                    />
                  </div>

                  {/* Education Cards (2 Cards) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                      Academic Background & Credentials
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {member.education.map((edu, idx) => (
                        <motion.div
                          key={`${edu.degree}-${edu.institution}`}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                          className="rounded-2xl border border-zinc-800 bg-brand-graphite/80 p-4 sm:p-5 space-y-2 hover:border-brand-gold/40 hover:bg-brand-graphite transition-all group/card shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-brand-gold/15 text-brand-gold-bright text-xs font-bold font-mono">
                              <GraduationCap className="w-3.5 h-3.5" />
                              <span>{edu.degree}</span>
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400/80" />
                          </div>

                          <div className="space-y-0.5 pt-1">
                            <p className="text-xs text-zinc-400 font-medium">
                              {edu.field}
                            </p>
                            <p className="text-sm font-bold text-white group-hover/card:text-brand-gold-champagne transition-colors">
                              {edu.institution}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Description */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                      Professional Overview
                    </h4>
                    <div className="border-l-2 border-brand-gold/70 pl-4 py-0.5">
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        &ldquo;{member.bio}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Engineering Principles Badge List */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-lg bg-brand-charcoal border border-zinc-700/80 text-zinc-300">
                      Civil Engineering
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-lg bg-brand-charcoal border border-zinc-700/80 text-zinc-300">
                      Structural Planning
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-lg bg-brand-charcoal border border-zinc-700/80 text-zinc-300">
                      Built Environment
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
