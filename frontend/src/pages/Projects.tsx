import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, ExternalLink, ArrowRight } from 'lucide-react'
import { api } from '../api'
import { Link } from 'react-router-dom'

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProjects().then(data => {
      setProjects(Array.isArray(data) ? data : [])
    }).catch(() => setProjects([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Build something you can actually show.</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore projects created by or developed through the AfterClass community.
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 border border-border rounded-2xl bg-card">
              <h3 className="text-xl font-bold mb-2">Projects are coming soon.</h3>
              <p className="text-gray-400">We're preparing the next set of projects for students to build with us.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, i) => (
                <motion.div 
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border flex flex-col h-full hover:border-primary/50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{proj.title}</h3>
                    <div className="flex gap-2">
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary transition-colors"><GitBranch className="w-4 h-4"/></a>}
                      {proj.demo && <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary transition-colors"><ExternalLink className="w-4 h-4"/></a>}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-6 flex-grow line-clamp-3">{proj.description}</p>
                  
                  <div className="mt-auto space-y-4">
                    {proj.author && <div className="text-sm text-gray-400">Contributors: <span className="text-foreground">{proj.author}</span></div>}
                    {proj.tech && (
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.split(',').map((t: string, j: number) => (
                          <span key={j} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link to={`/projects/${proj.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-2">
                      View Project <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
