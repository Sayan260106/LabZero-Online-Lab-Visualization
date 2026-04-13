import React, { useState, useEffect } from 'react';
import { Topic, TopicView, Resource } from '../types';
import { ArrowLeft, BookOpen, Play, Sparkles, FileText, Trash2, Download, ExternalLink, Presentation, GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// import ResourceUpload from './ResourceUpload';
// import ResourceViewer from './ResourceViewer';
//import Classroom from './Classroom';
// import { getResourcesByTopic, deleteResource } from '../services/resourceService';

interface TopicPageProps {
  topic: Topic;
  onBack: () => void;
  visualization: React.ReactNode;
}

const TopicPage: React.FC<TopicPageProps> = ({ topic, onBack, visualization }) => {
  const [activeView, setActiveView] = useState<TopicView>(TopicView.THEORY);
  const [resources, setResources] = useState<Resource[]>([]);
  const [viewingResource, setViewingResource] = useState<Resource | null>(null);

//   const fetchResources = async () => {
//     try {
//       const data = await getResourcesByTopic(topic.id);
//       setResources(data.sort((a, b) => b.timestamp - a.timestamp));
//     } catch (err) {
//       console.error('Failed to fetch resources:', err);
//     }
//   };

//   useEffect(() => {
//     fetchResources();
//   }, [topic.id]);

//   const handleDeleteResource = async (id: string) => {
//     try {
//       await deleteResource(id);
//       fetchResources();
//     } catch (err) {
//       console.error('Failed to delete resource:', err);
//     }
//   };

  const handleDownloadResource = (resource: Resource) => {
    const link = document.createElement('a');
    link.href = resource.content;
    link.download = resource.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Topic Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 px-8 py-5 transition-all">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                {topic.name}
              </h1>
              <p className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest">
                Interactive Module
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-900/50 rounded-2xl border border-white/5">
            <button
              onClick={() => setActiveView(TopicView.THEORY)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                activeView === TopicView.THEORY
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={16} />
              Theory
            </button>
            <button
              onClick={() => setActiveView(TopicView.VISUALIZATION)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                activeView === TopicView.VISUALIZATION
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play size={16} />
              Visualization
            </button>
            <button
              onClick={() => setActiveView(TopicView.CLASSROOM)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                activeView === TopicView.CLASSROOM
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap size={16} />
              Classroom
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {activeView === TopicView.THEORY ? (
          <div className="h-full overflow-y-auto px-8 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Theory Content */}
              <div className="p-12 rounded-[40px] bg-slate-900/50 border border-white/5 backdrop-blur-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-indigo-500/20">
                  <Sparkles size={120} />
                </div>
                <div className="prose prose-invert prose-indigo max-w-none">
                  <ReactMarkdown>{topic.theory}</ReactMarkdown>
                </div>
              </div>

              {/* Resources Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Study Resources</h2>
                    <p className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest">Uploaded Materials</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource) => (
                    <div 
                      key={resource.id} 
                      className="group p-4 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <FileText size={20} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-bold text-white truncate max-w-[200px]">{resource.name}</span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            {new Date(resource.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setViewingResource(resource)}
                          className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all flex items-center justify-center"
                          title="Present"
                        >
                          <Presentation size={16} />
                        </button>
                        <button
                          onClick={() => handleDownloadResource(resource)}
                          className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        {/* <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button> */}
                      </div>
                    </div>
                  ))}
                  
                  {resources.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 text-sm font-mono uppercase tracking-widest">
                      No resources uploaded yet
                    </div>
                  )}
                </div>

                {/* <ResourceUpload topicId={topic.id} onUploadComplete={fetchResources} /> */}
              </div>
            </div>
          </div>
        ) : activeView === TopicView.VISUALIZATION ? (
          <div className="h-full w-full">
            {visualization}
          </div>
        ) : null}
      </main>

      {/* Resource Viewer Modal */}
      {/* {viewingResource && (
        <ResourceViewer
          resource={viewingResource}
          onClose={() => setViewingResource(null)}
        />
      )} */}
    </div>
  );
};

export default TopicPage;
