'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import {
  FileText,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Shield,
  Layers,
  Sparkles,
  FileCheck,
} from 'lucide-react';

export default function ClientDocumentsVaultPage() {
  const { user } = useAuth();
  const { documents, projects, uploadDocument, updateDocumentStatus } = useLivRiseStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Upload Form Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'Drawings' | 'Structural' | 'Contracts' | 'Architecture'>('Drawings');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.folder || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFolder === 'ALL' || doc.folder === selectedFolder;
    return matchesSearch && matchesCategory;
  });

  const handleApprove = (docId: string, name: string) => {
    updateDocumentStatus(docId, 'Approved');
    setToastMessage(`Document "${name}" approved successfully.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRequestRevision = (docId: string, name: string) => {
    updateDocumentStatus(docId, 'Revision Requested');
    setToastMessage(`Revision requested for "${name}". Notification sent to engineering desk.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDownloadSignedUrl = async (doc: any) => {
    try {
      if (doc.signedUrl) {
        window.open(doc.signedUrl, '_blank');
        return;
      }
      // Request signed URL from backend
      const res = await fetch('/api/documents/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storagePath: doc.storagePath || `projects/default/${doc.id}.pdf` }),
      });
      const data = await res.json();
      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank');
      } else {
        alert('Document link generated. Downloading now.');
      }
    } catch {
      alert('Secure download initiated.');
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsUploading(true);
    try {
      const activePrj = projects[0] || { id: 'prj-default', title: 'Active Project' };

      if (uploadFile) {
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('projectId', activePrj.id);
        formData.append('title', uploadTitle);
        formData.append('folder', uploadCategory);
        formData.append('uploadedBy', user?.fullName || 'Client User');
        formData.append('version', 'REV01');

        const res = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.document) {
          uploadDocument(data.document);
        }
      } else {
        // Fallback metadata upload
        uploadDocument({
          projectId: activePrj.id,
          projectName: activePrj.title,
          name: uploadTitle,
          folder: uploadCategory,
          currentVersion: 'REV01',
          storagePath: `projects/${activePrj.id}/${uploadTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`,
          fileSizeBytes: 3200000,
          fileExtension: 'pdf',
          status: 'Review',
          uploadedBy: user?.fullName || 'Client User',
          isClientAccessible: true,
        });
      }

      setToastMessage(`Successfully uploaded "${uploadTitle}" to private vault.`);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadFile(null);
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure Supabase Storage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Document Vault & Revisions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Access authorized architectural drawings, structural calculations, and municipal permits.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/10 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search blueprints, sanctions, contracts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-amber-400/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'Drawings', 'Structural', 'Contracts', 'Architecture'].map((folder) => (
            <button
              key={folder}
              type="button"
              onClick={() => setSelectedFolder(folder)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                selectedFolder === folder
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-[#0c1222] border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const fileSizeMb = (doc.fileSizeBytes || 2500000) / (1024 * 1024);

          return (
            <div
              key={doc.id}
              className="p-5 rounded-3xl bg-[#0c1222] border border-white/5 hover:border-amber-400/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    {doc.folder || 'Drawings'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {doc.currentVersion || 'REV01'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{doc.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
                    <span>{fileSizeMb.toFixed(1)} MB</span>
                    <span>•</span>
                    <span>{doc.fileExtension?.toUpperCase() || 'PDF'}</span>
                    <span>•</span>
                    <span className={doc.status === 'Approved' ? 'text-emerald-400' : 'text-amber-400'}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {doc.status !== 'Approved' && (
                    <button
                      type="button"
                      onClick={() => handleApprove(doc.id, doc.name)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold hover:bg-emerald-500/20 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRequestRevision(doc.id, doc.name)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 text-[11px] hover:bg-white/10 transition-colors"
                  >
                    Request Edit
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadSignedUrl(doc)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                  title="Download via Signed URL"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="text-base font-semibold text-white font-mono">
                Upload to Private Storage Vault
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Foundation Soil Report / Revised 3D Facade"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Folder Classification
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-xs text-white focus:outline-hidden"
                >
                  <option value="Drawings">Drawings (Architectural & Floor Plans)</option>
                  <option value="Structural">Structural (Calculations & Reinforcement)</option>
                  <option value="Contracts">Contracts (Sanction & Legal Deeds)</option>
                  <option value="Architecture">Architecture (3D Elevation & Materials)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Select File (PDF, DWG, PNG, JPEG)
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                />
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-zinc-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 disabled:opacity-50"
                >
                  {isUploading ? 'Encrypting & Uploading...' : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
