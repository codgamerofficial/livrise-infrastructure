import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';

export const metadata = {
  title: 'LivRise Operations & Management Console',
  description: 'Enterprise ERP, CRM, Project Lifecycle, Quotations, Invoices and Document Control System.',
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
