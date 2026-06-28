import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Code, Terminal, Video, ExternalLink } from 'lucide-react'
import { api } from '../api'

const iconMap: Record<string, React.ReactNode> = {
  'Guide': <Code className="w-6 h-6" />,
  'List': <Terminal className="w-6 h-6" />,
  'Assets': <BookOpen className="w-6 h-6" />,
  'Learning': <Video className="w-6 h-6" />,
}

export default function Resources() {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getResources().then(data => {
      setResources(Array.isArray(data) ? data : [])
    }).catch(() => setResources([])).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="max-w-6xl mx-auto py-20 px-4"><p className="text-gray-400">Loading...</p></div>

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Resources Library</h1>
        <p className="text-gray-400">Curated materials to help you grow beyond the classroom.</p>
      </div>

      {resources.length === 0 ? (
        <p className="text-gray-500">No resources yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                {iconMap[res.tag] || <BookOpen className="w-6 h-6" />}
              </div>
              {res.tag && <span className="text-xs font-semibold text-primary mb-2 inline-block px-2 py-1 bg-primary/10 rounded-md">{res.tag}</span>}
              <h3 className="text-xl font-bold mb-2">{res.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{res.description}</p>
              {res.link && (
                <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Open <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
