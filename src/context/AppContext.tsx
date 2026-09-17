import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase, isConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  creator: string | null;
  date: string | null;
  tags: string[] | null;
  thumbnail: string | null;
  color: string | null;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  category: string | null;
  completed: boolean;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  action: string;
  target: string | null;
  created_at: string;
}

interface AppContextType {
  contentItems: ContentItem[];
  favorites: string[];
  collections: Collection[];
  tasks: Task[];
  activities: Activity[];
  loadingContent: boolean;
  loadingFavorites: boolean;
  loadingCollections: boolean;
  loadingTasks: boolean;
  error: string | null;
  fetchContent: () => Promise<void>;
  toggleFavorite: (itemId: string) => Promise<void>;
  fetchFavorites: () => Promise<void>;
  fetchCollections: () => Promise<void>;
  createCollection: (name: string) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  addToCollection: (collectionId: string, itemId: string) => Promise<void>;
  removeFromCollection: (collectionId: string, itemId: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  logActivity: (action: string, target: string | null) => Promise<void>;
  fetchActivities: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user, configured } = useAuth();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    if (!configured) { setLoadingContent(false); return; }
    try {
      setLoadingContent(true);
      const { data, error } = await supabase.from('content_items').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setContentItems(data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load content');
    } finally {
      setLoadingContent(false);
    }
  }, [configured]);

  const fetchFavorites = useCallback(async () => {
    if (!configured || !user) return;
    try {
      setLoadingFavorites(true);
      const { data, error } = await supabase.from('favorites').select('content_item_id').eq('user_id', user.id);
      if (error) throw error;
      setFavorites((data || []).map(f => f.content_item_id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingFavorites(false);
    }
  }, [configured, user]);

  const toggleFavorite = useCallback(async (itemId: string) => {
    if (!configured || !user) return;
    const isFav = favorites.includes(itemId);
    // Optimistic update
    setFavorites(prev => isFav ? prev.filter(id => id !== itemId) : [...prev, itemId]);
    try {
      if (isFav) {
        await supabase.from('favorites').delete().eq('user_id', user.id).eq('content_item_id', itemId);
        await logActivity('removed_favorite', itemId);
      } else {
        await supabase.from('favorites').insert({ user_id: user.id, content_item_id: itemId });
        await logActivity('added_favorite', itemId);
      }
    } catch (e: any) {
      // Revert on error
      setFavorites(prev => isFav ? [...prev, itemId] : prev.filter(id => id !== itemId));
      setError(e.message);
    }
  }, [configured, user, favorites]);

  const fetchCollections = useCallback(async () => {
    if (!configured || !user) return;
    try {
      setLoadingCollections(true);
      const { data, error } = await supabase.from('collections').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      setCollections(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingCollections(false);
    }
  }, [configured, user]);

  const createCollection = useCallback(async (name: string) => {
    if (!configured || !user) return;
    const { data, error } = await supabase.from('collections').insert({ user_id: user.id, name }).select().single();
    if (error) throw error;
    setCollections(prev => [data, ...prev]);
    await logActivity('created_collection', name);
  }, [configured, user]);

  const deleteCollection = useCallback(async (id: string) => {
    if (!configured || !user) return;
    await supabase.from('collections').delete().eq('id', id).eq('user_id', user.id);
    setCollections(prev => prev.filter(c => c.id !== id));
  }, [configured, user]);

  const addToCollection = useCallback(async (collectionId: string, itemId: string) => {
    if (!configured || !user) return;
    await supabase.from('collection_items').insert({ collection_id: collectionId, content_item_id: itemId });
  }, [configured, user]);

  const removeFromCollection = useCallback(async (collectionId: string, itemId: string) => {
    if (!configured || !user) return;
    await supabase.from('collection_items').delete().eq('collection_id', collectionId).eq('content_item_id', itemId);
  }, [configured, user]);

  const fetchTasks = useCallback(async () => {
    if (!configured || !user) return;
    try {
      setLoadingTasks(true);
      const { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      setTasks(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingTasks(false);
    }
  }, [configured, user]);

  const createTask = useCallback(async (task: Partial<Task>) => {
    if (!configured || !user) return;
    const { data, error } = await supabase.from('tasks').insert({ ...task, user_id: user.id }).select().single();
    if (error) throw error;
    setTasks(prev => [data, ...prev]);
    await logActivity('created_task', task.title || null);
  }, [configured, user]);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    if (!configured || !user) return;
    await supabase.from('tasks').update(updates).eq('id', id).eq('user_id', user.id);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, [configured, user]);

  const deleteTask = useCallback(async (id: string) => {
    if (!configured || !user) return;
    await supabase.from('tasks').delete().eq('id', id).eq('user_id', user.id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [configured, user]);

  const logActivity = useCallback(async (action: string, target: string | null) => {
    if (!configured || !user) return;
    await supabase.from('activities').insert({ user_id: user.id, action, target });
    setActivities(prev => [{ id: crypto.randomUUID(), user_id: user.id, action, target, created_at: new Date().toISOString() }, ...prev].slice(0, 50));
  }, [configured, user]);

  const fetchActivities = useCallback(async () => {
    if (!configured || !user) return;
    const { data } = await supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50);
    if (data) setActivities(data);
  }, [configured, user]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchCollections();
      fetchTasks();
      fetchActivities();
    } else {
      setFavorites([]);
      setCollections([]);
      setTasks([]);
      setActivities([]);
    }
  }, [user, fetchFavorites, fetchCollections, fetchTasks, fetchActivities]);

  return (
    <AppContext.Provider value={{
      contentItems, favorites, collections, tasks, activities,
      loadingContent, loadingFavorites, loadingCollections, loadingTasks, error,
      fetchContent, toggleFavorite, fetchFavorites,
      fetchCollections, createCollection, deleteCollection, addToCollection, removeFromCollection,
      fetchTasks, createTask, updateTask, deleteTask,
      logActivity, fetchActivities
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
