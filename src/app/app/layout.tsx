import type { Metadata } from 'next';
import { AppShell } from '@/components/app/AppShell';

export const metadata: Metadata = {
  title: 'Client Portal | LivRise Infrastructure',
  description: 'Manage active engineering, architecture, and infrastructure projects, drawings, messages, and invoices.',
};

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
