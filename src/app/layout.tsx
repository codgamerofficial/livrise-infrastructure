import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LivRiseStoreProvider } from '@/lib/store';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { SITE_SETTINGS } from '@/lib/site-settings';

export const viewport: Viewport = {
  themeColor: '#c5a059',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'LivRise Infrastructure | Engineering • Architecture • Infrastructure',
  description: 'LivRise Infrastructure brings engineering, architecture and infrastructure together through a modern project delivery experience. Building Ideas Into Reality.',
  keywords: [
    'LivRise Infrastructure',
    'LivRise',
    'Structural Engineering',
    'Architectural Design',
    'Infrastructure Consultancy',
    'Project Delivery Platform',
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
    description: 'LivRise Infrastructure brings engineering, architecture and infrastructure together through a modern project delivery experience. Building Ideas Into Reality.',
    url: 'https://livrise.in',
    siteName: 'LivRise Infrastructure',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop',
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
    description: 'Building Ideas Into Reality. Structured engineering, architecture and infrastructure project delivery.',
    images: ['https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
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
      <body className="bg-black text-white min-h-screen flex flex-col antialiased selection:bg-white selection:text-black font-sans">
        <LivRiseStoreProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <FloatingContact />
        </LivRiseStoreProvider>
      </body>
    </html>
  );
}
