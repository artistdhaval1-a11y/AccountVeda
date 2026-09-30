import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, Upload, X, Search, FileText, FileSpreadsheet, File, ExternalLink, Loader2, LogIn } from 'lucide-react';
import { googleSignIn } from '../lib/auth';
import { uploadFileToVault, makeFilePublic } from '../lib/drive';

interface KnowledgeFile { id:string; name:string; mimeType:string; size?:string; createdTime?:string; modifiedTime?:string; description?:string; viewUrl:string; }
interface KnowledgePortalProps { isOpen:boolean; onClose:()=>void; }

const iconFor = (mime:string) => mime.includes('spreadsheet') || mime.includes('excel') ? FileSpreadsheet : (mime.includes('pdf') || mime.includes('document') || mime.includes('word') ? FileText : File);

export default function KnowledgePortal({isOpen,onClose}:KnowledgePortalProps) {
  const [files,setFiles]=useState<KnowledgeFile[]>([]);
  const [search,setSearch]=useState('');
  const [loading,setLoading]=useState(false);
  const loadFiles=async()=>{ setLoading(true); try { const r=await fetch('/api/knowledge-files'); const d=await r.json(); setFiles(d.files||[]); setMessage(d.configured ? (d.error ? 'Knowledge files could not be loaded right now.' : '') : 'Knowledge storage is not configured yet.'); } catch { setMessage('Knowledge files could not be loaded right now.'); } finally { setLoading(false); } };
  useEffect(()=>{ if(isOpen) loadFiles(); },[isOpen]);

  const filtered=useMemo(()=>{const q=search.trim().toLowerCase(); return q?files.filter(f=>f.name.toLowerCase().includes(q)||(f.description||'').toLowerCase().includes(q)):files;},[files,search]);

  const upload=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]; e.target.value=''; if(!file)return;
    setUploading(true); setMessage('Signing in and uploading your document...');
    try {
      const auth=await googleSignIn(); if(!auth) throw new Error('Google sign-in was cancelled.');
      const folderId=import.meta.env.VITE_KNOWLEDGE_DRIVE_FOLDER_ID;
      if(!folderId) throw new Error('Knowledge Drive folder is not configured yet.');
      const uploaded=await uploadFileToVault(auth.accessToken,folderId,file);
      await makeFilePublic(auth.accessToken,uploaded.id);
      setMessage('Document uploaded successfully.'); await loadFiles();
    } catch(err:any){setMessage(err?.message||'Upload failed.');} finally {setUploading(false);}
  };

  if(!isOpen)return null;
  return <AnimatePresence><motion.div className="fixed inset-0 z-[70] bg-dark/70 backdrop-blur-sm flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <motion.div initial={{opacity:0,y:18,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:18,scale:.98}} className="bg-white rounded-2xl shadow-2xl border border-primary/10 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
      <div className="bg-primary px-6 md:px-8 py-5 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3"><div className="p-2 bg-white/10 rounded-lg"><BookOpen className="w-5 h-5"/></div><div><h2 className="text-lg md:text-xl font-black uppercase tracking-wider">Knowledge Portal</h2><p className="text-[10px] text-white/70 font-semibold uppercase tracking-widest mt-1">Accounting • GST • TDS • Income Tax • Compliance</p></div></div>
        <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center" aria-label="Close Knowledge Portal"><X className="w-5 h-5"/></button>
      </div>
      <div className="px-6 md:px-8 py-4 border-b border-gray-100 shrink-0">
        <div className="relative flex-1 max-w-xl"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search knowledge resources..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"/></div>
      </div>
      <div className="p-6 md:p-8 overflow-y-auto flex-1">
        {message && <div className="mb-5 p-4 rounded-xl bg-light border border-primary/10 text-xs font-semibold text-gray-600 flex items-start gap-2"><BookOpen className="w-4 h-4 text-secondary shrink-0"/><span>{message}</span></div>}
        {loading ? <div className="py-16 flex justify-center"><Loader2 className="w-7 h-7 text-secondary animate-spin"/></div> : filtered.length===0 ? <div className="py-16 text-center border border-dashed border-primary/15 rounded-2xl bg-gray-50/60"><BookOpen className="w-10 h-10 text-primary/25 mx-auto mb-3"/><h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">No resources yet</h3><p className="text-xs text-gray-500 mt-2">Upload your first accounting or tax reading file from Admin Upload.</p></div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{filtered.map(file=>{const Icon=iconFor(file.mimeType);return <div key={file.id} className="border border-gray-150 rounded-2xl p-5 hover:shadow-md hover:border-primary/15 transition-all bg-white"><div className="flex items-start gap-4"><div className="w-11 h-11 rounded-xl bg-light text-primary flex items-center justify-center shrink-0"><Icon className="w-5 h-5"/></div><div className="min-w-0 flex-1"><h3 className="text-sm font-black text-gray-800 break-words">{file.name}</h3><p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Reading Resource</p><a href={file.viewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-secondary">Read File <ExternalLink className="w-3.5 h-3.5"/></a></div></div></div>})}</div>}
      </div>
    </motion.div>
  </motion.div></AnimatePresence>;
}
