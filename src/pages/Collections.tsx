import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FolderOpen, Plus, Trash2, X, Loader2 } from 'lucide-react';

export default function Collections() {
  const { collections, createCollection, deleteCollection, loadingCollections } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    await createCollection(newName.trim());
    setNewName('');
    setShowCreate(false);
    setCreating(false);
  };

  if (loadingCollections) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Collections</h1>
          <p className="text-muted">Organize your content into custom folders</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors"
        >
          <Plus size={16} /> New Collection
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create Collection</h2>
              <button onClick={() => setShowCreate(false)} className="text-muted hover:text-text">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Collection name..."
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50 mb-4"
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
            <div className="flex gap-3">
              <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm text-muted hover:text-text transition-colors">
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !newName.trim()}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {collections.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={24} className="text-muted" />
          </div>
          <h3 className="text-lg font-medium mb-2">No collections yet</h3>
          <p className="text-muted mb-6">Create your first collection to start organizing</p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Create Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map(col => (
            <div key={col.id} className="group p-5 rounded-2xl border border-border bg-surface hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FolderOpen size={24} className="text-primary" />
                </div>
                <button
                  onClick={() => deleteCollection(col.id)}
                  className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Delete collection"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h3 className="font-semibold mb-1">{col.name}</h3>
              <p className="text-xs text-muted">Created {new Date(col.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
