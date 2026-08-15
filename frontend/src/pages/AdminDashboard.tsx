import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import {
  BookOpen, Code, Briefcase, Users, Rocket, Shield, LogOut, Plus, Pencil, Trash2, X,
} from 'lucide-react'

type Tab = 'resources' | 'projects' | 'members' | 'internships' | 'admins'

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
  { key: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },  { key: 'members', label: 'Members', icon: <Users className="w-4 h-4" /> },
  { key: 'internships', label: 'Internships', icon: <Rocket className="w-4 h-4" /> },
  { key: 'admins', label: 'Admins', icon: <Shield className="w-4 h-4" /> },
]

const emptyForm: Record<string, any> = {
  resources: { title: '', description: '', tag: '', link: '' },
  projects: { title: '', description: '', author: '', tech: '', github: '', demo: '' },  members: { name: '', role: '', tag: '', quote: '', skills: '', projects: 0, commits: 0, badges: '' },
  internships: { title: '', company: '', description: '', location: 'Remote', stipend: '', duration: '', google_form_link: '', tag: '' },
  admins: { username: '', password: '', role: 'admin' },
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('resources')
  const [items, setItems] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState<any>(emptyForm.resources)
  const [loading, setLoading] = useState(true)
  const [adminInfo, setAdminInfo] = useState<{ id: number; username: string; role: string } | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.me().then(data => {
      if (data?.username) setAdminInfo(data)
    }).catch(() => {})
  }, [])

  useEffect(() => {
    loadItems()
  }, [activeTab])

  async function loadItems() {
    setLoading(true)
    try {
      const fetcher: Record<string, () => Promise<any>> = {
        resources: api.getResources,
        projects: api.getProjects,        members: api.getMembers,
        internships: api.getInternships,
        admins: api.getAdmins,
      }
      const data = await fetcher[activeTab]()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    setForm({ ...emptyForm[activeTab] })
    setEditing(null)
    setShowForm(true)
  }

  function openEdit(item: any) {
    setForm({ ...item })
    setEditing(item)
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const creators: Record<string, (d: any) => Promise<any>> = {
      resources: api.createResource,
      projects: api.createProject,      members: api.createMember,
      internships: api.createInternship,
      admins: api.createAdmin,
    }
    const updaters: Record<string, (id: number, d: any) => Promise<any>> = {
      resources: api.updateResource,
      projects: api.updateProject,      members: api.updateMember,
      internships: api.updateInternship,
      admins: api.updateAdmin,
    }
    try {
      if (editing) {
        const data = { ...form }
        if (activeTab === 'admins' && !data.password) delete data.password
        await updaters[activeTab](editing.id, data)
      } else {
        await creators[activeTab](form)
      }
      setShowForm(false)
      setEditing(null)
      loadItems()
    } catch {
      alert('Failed to save')
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this item?')) return
    const deleters: Record<string, (id: number) => Promise<any>> = {
      resources: api.deleteResource,
      projects: api.deleteProject,      members: api.deleteMember,
      internships: api.deleteInternship,
      admins: api.deleteAdmin,
    }
    try {
      await deleters[activeTab](id)
      loadItems()
    } catch {
      alert('Failed to delete')
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  function renderField(name: string, label: string, type: string = 'text') {
    const value = form[name] ?? ''
    return (
      <div key={name}>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={e => setForm({ ...form, [name]: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            rows={3}
          />
        ) : type === 'number' ? (
          <input
            type="number"
            value={value}
            onChange={e => setForm({ ...form, [name]: Number(e.target.value) })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => setForm({ ...form, [name]: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        )}
      </div>
    )
  }

  const fieldConfig: Record<string, { name: string; label: string; type?: string }[]> = {
    resources: [
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'tag', label: 'Tag (e.g. Guide, List, Assets)' },
      { name: 'link', label: 'Link (optional)' },
    ],
    projects: [
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'author', label: 'Author' },
      { name: 'tech', label: 'Tech Stack (comma separated)' },
      { name: 'github', label: 'GitHub Link' },
      { name: 'demo', label: 'Demo Link' },
    ],    members: [
      { name: 'name', label: 'Name' },
      { name: 'role', label: 'Role' },
      { name: 'tag', label: 'Tag (e.g. AIML Student)' },
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'skills', label: 'Skills (comma separated)' },
      { name: 'projects', label: 'Projects count', type: 'number' },
      { name: 'commits', label: 'Commits count', type: 'number' },
      { name: 'badges', label: 'Badges (JSON array string, optional)' },
    ],
    internships: [
      { name: 'title', label: 'Title' },
      { name: 'company', label: 'Company' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'location', label: 'Location' },
      { name: 'stipend', label: 'Stipend (e.g. â‚¹10,000/month)' },
      { name: 'duration', label: 'Duration (e.g. 3 months)' },
      { name: 'google_form_link', label: 'Google Form Link *' },
      { name: 'tag', label: 'Tag (e.g. ðŸ”¥ Hot, New)' },
    ],
    admins: [
      { name: 'username', label: 'Username' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'role', label: 'Role (admin / super_admin)' },
    ],
  }

  return (
    <div className="min-h-[80vh]">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-border pb-2">
          {tabs.filter(t => t.key !== 'admins' || adminInfo?.role === 'super_admin').map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary/10 text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-foreground'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={openCreate}
          className="mb-4 flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add {activeTab.slice(0, -1)}
        </button>

        {/* Items list */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          <div className="space-y-2">
              {items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title || item.name || item.username}</p>
                  <p className="text-xs text-gray-500 truncate">{item.description || item.role || item.company || item.type || item.role}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <button onClick={() => openEdit(item)} className="p-1.5 hover:text-primary transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-bold">{editing ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-3">
              {(fieldConfig[activeTab] || []).map(f => renderField(f.name, f.label, f.type))}
              <div className="pt-2 flex gap-2 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-border/50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

