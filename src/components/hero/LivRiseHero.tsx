'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatedHeading } from './AnimatedHeading';
import { FadeIn } from './FadeIn';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { EmailContactButton } from '@/components/ui/EmailContactButton';
import { getWhatsAppLink } from '@/lib/site-settings';

export function LivRiseHero() {
  return (
    <div className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* Background Video - Absolutely positioned, full viewport, raw playback (NO overlay) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
      />

      {/* Sticky Liquid-Glass Header */}
      <LivRiseNavbar />

      {/* Hero Content (Pushed to bottom of viewport) */}
      <main className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-end gap-8 lg:gap-12">
          {/* Left Column: Heading, Subheading & CTAs */}
          <div>
            <AnimatedHeading
              text={`Imagine It. Design It.\nWe'll Build It.`}
              className="text-white"
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-6 max-w-xl leading-relaxed">
                Engineering, architecture and infrastructure brought together through a modern project delivery experience.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href="/start-project"
                  className="bg-white text-black px-7 sm:px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 text-center inline-block cursor-pointer shadow-lg shadow-black/40"
                >
                  Start a Project
                </Link>

                <a
                  href={getWhatsAppLink('Hello LivRise Infrastructure, I would like to discuss a project.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 px-6 sm:px-7 py-3 rounded-lg font-medium transition-all duration-300 text-center inline-flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
                  </svg>
                  <span>WhatsApp Us</span>
                </a>

                <EmailContactButton
                  label="Email LivRise"
                  variant="outline"
                  subject="Project Enquiry — LivRise Infrastructure"
                  body="Hello LivRise Infrastructure,&#10;&#10;I would like to discuss a project.&#10;&#10;Regards,"
                  className="px-6 sm:px-7 py-3"
                />

                <a
                  href="#projects"
                  className="liquid-glass liquid-glass-btn border border-white/20 text-white px-6 sm:px-7 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-300 text-center inline-block cursor-pointer"
                >
                  Explore Our Work
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Floating Tag Card aligned to bottom-right on lg screens */}
          <div className="flex items-end justify-start lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl shadow-xl backdrop-blur-md">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white whitespace-nowrap">
                  Engineering. Architecture. Infrastructure.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
}
