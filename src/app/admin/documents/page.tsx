'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import { ProjectDocument, DocumentCategory } from '@/types';
import {
  FileText,
  Upload,
  Search,
  CheckCircle,
  Eye,
  EyeOff,
  Filter,
  Shield,
  FileCheck,
  Layers,
} from 'lucide-react';

const CATEGORIES: DocumentCategory[] = [
  'Architecture',
  'Structural',
  'Drawings',
  'Reports',
  'Estimation',
  'Contracts',
  'Approvals',
  'Invoices',
  'Other',
];

export default function AdminDocumentsPage() {
  const {
    documents,
    projects,
    uploadDocument,
    updateDocumentStatus,
  } = useLivRiseStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [title, setTitle] = useState('');
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('Structural');
  const [version, setVersion] = useState('REV01');
  const [isClientVisible, setIsClientVisible] = useState(true);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fileName) return;

    const project = projects.find((p) => p.id === projectId);
    uploadDocument({
      projectId,
      projectName: project?.title || 'Engineering Project',
      folder: category,
      category,
      name: title,
      title,
      fileName,
      storagePath: `/vault/${fileName}`,
      fileUrl: `/vault/${fileName}`,
      fileSizeBytes: 4800000,
      fileSize: '4.8 MB',
      fileType: 'application/pdf',
      fileExtension: 'pdf',
      currentVersion: version,
      version,
      status: 'Approved',
      uploadedBy: 'Iman Khanra (CEO / Admin)',
      isClientAccessible: isClientVisible,
      isClientVisible,
    });

    setTitle('');
    setFileName('');
    setShowUploadModal(false);
  };

  const filteredDocs = documents.filter((d) => {
    const docTitle = d.title || d.name || '';
    const docFile = d.fileName || d.storagePath || '';
    const docVer = d.version || d.currentVersion || '';
    const matchesSearch =
      docTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      docFile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      docVer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || (d.category || d.folder) === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <FileText className="w-6 h-6 text-sky-400" />
            SECURE ENGINEERING DOCUMENT VAULT
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Revisional CAD drawings, STAAD.Pro structural calculations, municipal NOCs, and client access controls.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-400 text-slate-950 hover:bg-sky-300 transition-colors shadow-lg shadow-sky-400/20"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Revisional Deliverable</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search documents by title, filename, or revision code (REV03)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400/50"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs font-mono focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const project = projects.find((p) => p.id === doc.projectId);

          return (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-sky-400/30 transition-all space-y-3.5 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                    {doc.version}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      doc.isClientVisible
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1'
                        : 'bg-slate-800 text-slate-400 flex items-center gap-1'
                    }`}
                  >
                    {doc.isClientVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {doc.isClientVisible ? 'Client Accessible' : 'Internal Only'}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">{doc.title}</h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{doc.fileName}</p>
                </div>

                <div className="text-[11px] text-slate-400">
                  Project: <span className="text-slate-300 font-medium">{project?.title}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Category: {doc.category}</span>
                  <span>Size: {doc.fileSize}</span>
                </div>
              </div>

              {/* Status & Review Controls */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <select
                  value={doc.status}
                  onChange={(e) => updateDocumentStatus(doc.id, e.target.value as ProjectDocument['status'])}
                  className="bg-[#070b14] border border-white/10 rounded-lg px-2 py-1 text-[11px] text-sky-300 focus:outline-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Archived">Archived</option>
                </select>

                <span className="text-[10px] text-slate-500">By: {doc.uploadedBy.split(' ')[0]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Upload className="w-5 h-5 text-sky-400" />
              Upload Revisional Engineering Document
            </h3>

            <form onSubmit={handleUpload} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Target Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.projectCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Ground Floor Foundation Layout & Piling Plan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">File Name</label>
                <input
                  type="text"
                  placeholder="e.g. Structural_Drawing_REV03.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                    className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Revision Code</label>
                  <input
                    type="text"
                    placeholder="REV01, REV02..."
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="clientVisible"
                  checked={isClientVisible}
                  onChange={(e) => setIsClientVisible(e.target.checked)}
                  className="rounded border-white/10 accent-sky-400"
                />
                <label htmlFor="clientVisible" className="text-xs text-slate-300">
                  Authorize Visibility for Client Delivery
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-400 text-slate-950 text-xs font-bold hover:bg-sky-300"
                >
                  Commit Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
