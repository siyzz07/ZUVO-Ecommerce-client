import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Trash2, Edit2, Tag, Search, 
    X, Check, Loader2, List
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const CategoryManagement = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/categories');
            const data = await response.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category: any) => {
        setEditingId(category._id);
        setFormData({
            name: category.name,
            description: category.description || ''
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure? This might affect products in this category.')) return;
        
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setCategories(categories.filter(c => c._id !== id));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        
        try {
            const token = localStorage.getItem('adminToken');
            const url = editingId 
                ? `http://localhost:5000/api/categories/${editingId}`
                : 'http://localhost:5000/api/categories';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                await fetchCategories();
                resetForm();
            }
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ name: '', description: '' });
        setIsFormOpen(false);
    };

    const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout 
            title="Categories" 
            subtitle="Manage your store's product classifications."
        >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search categories..." 
                        className="w-full bg-white dark:bg-zinc-900 py-3.5 pl-11 pr-4 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white"
                    />
                </div>
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="bg-brand-primary text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 active:scale-95 transition-all"
                >
                    <Plus size={18} /> New Category
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-brand-primary" /></div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category Name</th>
                                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Slug</th>
                                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Description</th>
                                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filteredCategories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-4 font-bold text-zinc-900 dark:text-white text-sm">{cat.name}</td>
                                    <td className="p-4 text-zinc-400 text-xs font-mono">{cat.slug}</td>
                                    <td className="p-4 text-zinc-500 text-sm max-w-xs truncate">{cat.description || '-'}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleEdit(cat)} className="p-2 text-zinc-400 hover:text-brand-primary transition-colors"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(cat._id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetForm}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold dark:text-white">{editingId ? 'Edit Category' : 'New Category'}</h3>
                                <button onClick={resetForm} className="p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Category Name</label>
                                    <input 
                                        required value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 rounded-xl text-sm dark:text-white outline-none focus:border-brand-primary transition-all"
                                        placeholder="e.g. Mechanical Keyboards"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Description</label>
                                    <textarea 
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-4 rounded-xl text-sm dark:text-white outline-none focus:border-brand-primary transition-all resize-none"
                                        rows={3} placeholder="Brief details about this category..."
                                    />
                                </div>

                                <button 
                                    disabled={actionLoading}
                                    className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                                >
                                    {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                    {editingId ? 'Save Changes' : 'Create Category'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
};

export default CategoryManagement;
