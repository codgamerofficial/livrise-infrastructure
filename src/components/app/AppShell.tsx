'use client';

import React, { useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { BottomNavigation } from './BottomNavigation';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileActionSheet } from './MobileActionSheet';
import { CommandPalette } from './CommandPalette';
import { MobileBottomSheet } from './MobileBottomSheet';
import { PageTransition } from './PageTransition';
import { useLivRiseStore } from '@/lib/store';
import { Upload, CheckCircle2 } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  headerTitle?: string;
}

export function AppShell({ children, headerTitle }: AppShellProps) {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<'Architecture' | 'Structural' | 'Drawings' | 'Contracts'>('Drawings');

  const { uploadDocument, projects } = useLivRiseStore();

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const firstPrj = projects[0] || { id: 'prj-default', title: 'Active Project' };

    uploadDocument({
      projectId: firstPrj.id,
      projectName: firstPrj.title,
      name: docTitle,
      folder: docCategory,
      currentVersion: 'REV01',
      storagePath: `projects/${firstPrj.id}/${docTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      fileSizeBytes: 2450000,
      fileExtension: 'pdf',
      status: 'Approved',
      uploadedBy: 'Client Portal Upload',
      isClientAccessible: true,
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      setDocTitle('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col md:flex-row antialiased selection:bg-brand-indigo selection:text-white transition-colors duration-200">
      {/* Desktop Navigation Sidebar */}
      <DesktopSidebar />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Mobile App Top Header */}
        <MobileHeader
          title={headerTitle}
          onOpenActionSheet={() => setIsActionSheetOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Content Area with Page Animation */}
        <main className="flex-1 flex flex-col">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>

      {/* Mobile App Bottom Navigation */}
      <BottomNavigation />

      {/* Mobile Action Sheet Drawer */}
      <MobileActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        onUploadClick={() => setIsUploadModalOpen(true)}
      />

      {/* Global Command Center (Cmd+K / Search) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Upload Document Modal Sheet */}
      <MobileBottomSheet
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Project Document"
      >
        {uploadSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-white">Document Uploaded</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Your document has been logged into the project vault and dispatched to the engineering team.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                Document Title / Drawing Description
              </label>
              <input
                type="text"
                required
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g. Ground Floor Revised Column Layout"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value as unknown as typeof docCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-amber-400/50 focus:outline-none"
              >
                <option value="Drawings">Drawings & Blueprints</option>
                <option value="Architecture">Architecture Plans</option>
                <option value="Structural">Structural Details</option>
                <option value="Contracts">Contracts & Approvals</option>
              </select>
            </div>

            <div className="p-6 border-2 border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center text-center bg-white/2">
              <Upload className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-xs font-medium text-zinc-300">
                Tap to select file (PDF, DWG, PNG up to 50MB)
              </span>
              <span className="text-[10px] text-zinc-500 mt-1">
                Secure end-to-end encrypted storage
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
              >
                Upload to Vault
              </button>
            </div>
          </form>
        )}
      </MobileBottomSheet>
    </div>
  );
}
