import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LivRiseStoreProvider } from '@/lib/store';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { PwaInstallPrompt } from '@/components/ui/PwaInstallPrompt';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { SITE_SETTINGS } from '@/lib/site-settings';

export const viewport: Viewport = {
  themeColor: '#635BFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'LivRise Infrastructure | Anime × Architecture • Building Ideas Into Reality',
  description: 'LivRise Infrastructure brings modern architectural floor plans, photorealistic 3D elevations, interior design, and turnkey construction together into a vibrant digital experience. Building Ideas Into Reality.',
  keywords: [
    'LivRise Infrastructure',
    'LivRise',
    'House Plan',
    '3D Elevation',
    'Interior Design',
    'Residential Construction',
    'Architectural Design',
    'Turnkey Construction',
    'Building Ideas Into Reality',
  ],
  authors: [{ name: 'LivRise Infrastructure', url: 'https://livrise.in' }],
  creator: 'LivRise Infrastructure',
  publisher: 'LivRise Infrastructure',
  metadataBase: new URL('https://livrise.in'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'LivRise Infrastructure | Engineering • Architecture • Infrastructure',
    description: 'LivRise brings modern architectural planning, 3D home design, and construction together into a vibrant digital product experience. Imagine it. See it. Build it.',
    url: 'https://livrise.in',
    siteName: 'LivRise Infrastructure',
    images: [
      {
        url: '/images/anime/anime-dream-home.png',
        width: 1200,
        height: 630,
        alt: 'LivRise Infrastructure — Building Ideas Into Reality',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LivRise Infrastructure | Engineering • Architecture • Infrastructure',
    description: 'Building Ideas Into Reality. Modern architectural planning, 3D home design, and construction.',
    images: ['/images/anime/anime-dream-home.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_SETTINGS.companyName,
              url: 'https://livrise.in',
              email: SITE_SETTINGS.contactEmail,
              telephone: SITE_SETTINGS.displayWhatsApp,
              description: `${SITE_SETTINGS.descriptor}. ${SITE_SETTINGS.tagline}`,
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: SITE_SETTINGS.displayWhatsApp,
                  contactType: 'customer support and project enquiries',
                  email: SITE_SETTINGS.contactEmail,
                  availableLanguage: ['English', 'Hindi', 'Bengali'],
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('LivRise ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('LivRise ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="bg-(--bg-primary) text-(--text-primary) min-h-screen flex flex-col antialiased selection:bg-brand-indigo selection:text-white transition-colors duration-200 pb-16 md:pb-0 font-sans">
        <ThemeProvider>
          <LivRiseStoreProvider>
            <div className="flex-1 flex flex-col">{children}</div>
            <MobileBottomNav />
            <FloatingContact />
            <PwaInstallPrompt />
          </LivRiseStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
