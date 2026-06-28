import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, ExternalLink } from 'lucide-react'
import { api } from '../api'

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProjects().then(data => {
      setProjects(Array.isArray(data) ? data : [])
    }).catch(() => setProjects([])).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="max-w-6xl mx-auto py-20 px-4"><p className="text-gray-400">Loading...</p></div>

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects Showcase</h1>
        <p className="text-gray-400">See what our community members are building.</p>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{proj.title}</h3>
                <div className="flex gap-2">
                  {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary transition-colors"><GitBranch className="w-5 h-5"/></a>}
                  {proj.demo && <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary transition-colors"><ExternalLink className="w-5 h-5"/></a>}
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 flex-grow">{proj.description}</p>
              
              <div className="mt-auto">
                {proj.author && <div className="text-sm text-gray-500 mb-3">Built by: <span className="text-foreground font-medium">{proj.author}</span></div>}
                {proj.tech && (
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.split(',').map((t: string, j: number) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
