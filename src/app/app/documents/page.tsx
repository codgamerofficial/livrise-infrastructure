'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  FileText,
  Search,
  Download,
  Upload,
  Filter,
  CheckCircle2,
  Folder,
  Eye,
  FileCheck2,
} from 'lucide-react';
import { AppEmptyState } from '@/components/app/AppEmptyState';
import { MobileBottomSheet } from '@/components/app/MobileBottomSheet';

export default function ClientDocumentsPage() {
  const { documents, uploadDocument, projects } = useLivRiseStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [docName, setDocName] = useState('');
  const [docFolder, setDocFolder] = useState<'Architecture' | 'Structural' | 'Drawings' | 'Contracts' | 'Reports'>('Drawings');

  const folders = ['All', 'Drawings', 'Architecture', 'Structural', 'Contracts', 'Reports'];

  const filteredDocuments = documents.filter((doc) => {
    const matchesFolder = selectedFolder === 'All' ? true : doc.folder === selectedFolder;
    const matchesSearch =
      (doc.name || doc.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.folder || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.currentVersion || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const prj = projects[0] || { id: 'prj-01', title: 'Active Project' };

    uploadDocument({
      projectId: prj.id,
      projectName: prj.title,
      name: docName,
      folder: docFolder,
      currentVersion: 'REV01',
      storagePath: `projects/${prj.id}/${docName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      fileSizeBytes: 3200000,
      fileExtension: 'pdf',
      status: 'Approved',
      uploadedBy: 'Client Portal Upload',
      isClientAccessible: true,
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadOpen(false);
      setDocName('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span>Engineering Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Drawings & Documents
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Official revision-controlled blueprints, structural drawings, and statutory files.
          </p>
        </div>

        {/* Action: Upload */}
        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Search & Folder Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by drawing title, revision, category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>

        {/* Folder pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {folders.map((folder) => (
            <button
              key={folder}
              type="button"
              onClick={() => setSelectedFolder(folder)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedFolder === folder
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid / Table */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="arch-card p-4 sm:p-5 rounded-3xl border border-white/10 bg-black/60 flex flex-col justify-between group hover:border-amber-500/30 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center uppercase font-mono text-[11px] font-bold shrink-0">
                    {doc.fileExtension || 'PDF'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                      {doc.currentVersion}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {doc.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white tracking-tight mb-1 group-hover:text-amber-200 transition-colors line-clamp-2">
                  {doc.name || doc.title}
                </h3>

                <p className="text-[11px] text-zinc-400 mb-3">
                  {doc.projectName || 'LivRise Infrastructure'}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pb-3 border-b border-white/5">
                  <span>Folder: {doc.folder}</span>
                  <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions footer */}
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">
                  {((doc.fileSizeBytes || 2400000) / (1024 * 1024)).toFixed(1)} MB
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Viewing file: ${doc.name || doc.title}`)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors"
                    title="Quick Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Starting secure download for ${doc.name || doc.title}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors text-xs font-semibold shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AppEmptyState
          icon={FileText}
          title="No documents found"
          description="Try selecting another folder or clearing the search query."
          actionLabel="View All Documents"
          onAction={() => {
            setSelectedFolder('All');
            setSearchQuery('');
          }}
        />
      )}

      {/* Upload Document Bottom Sheet */}
      <MobileBottomSheet
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload to Project Vault"
      >
        {uploadSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-white">Upload Confirmed</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Your drawing has been registered and verified into the engineering vault.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Document / Drawing Name
              </label>
              <input
                type="text"
                required
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g. Ground Floor Boundary & Setback Layout"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Category
              </label>
              <select
                value={docFolder}
                onChange={(e) => setDocFolder(e.target.value as typeof docFolder)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-amber-400/50 focus:outline-none"
              >
                <option value="Drawings">Drawings & Blueprints</option>
                <option value="Architecture">Architecture Plans</option>
                <option value="Structural">Structural Details</option>
                <option value="Contracts">Contracts & Agreements</option>
                <option value="Reports">Reports & Geotechnical</option>
              </select>
            </div>

            <div className="p-6 border-2 border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center text-center bg-white/[0.02]">
              <Upload className="w-7 h-7 text-zinc-400 mb-2" />
              <span className="text-xs font-medium text-zinc-300">
                Tap to choose PDF, DWG, DXF, PNG
              </span>
              <span className="text-[10px] text-zinc-500 mt-1">
                Direct integration with Supabase Storage
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
              >
                Upload File
              </button>
            </div>
          </form>
        )}
      </MobileBottomSheet>
    </div>
  );
}
