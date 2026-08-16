import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, GitBranch, ExternalLink, Code2, User } from 'lucide-react'
import { api } from '../api'

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProjects().then(data => {
      if (Array.isArray(data)) {
        const found = data.find(p => p.id === Number(id))
        setProject(found || null)
      }
    }).catch(() => setProject(null)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="max-w-4xl mx-auto py-24 px-4 text-center text-gray-400">Loading project...</div>
  
  if (!project) return (
    <div className="max-w-4xl mx-auto py-24 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
      <Link to="/projects" className="text-primary hover:underline flex items-center justify-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>
    </div>
  )

  const techStack = project.tech ? project.tech.split(',').map((t: string) => t.trim()) : []

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-16 px-4 border-b border-border bg-card/30">
        <div className="max-w-4xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {project.author && (
              <span className="flex items-center gap-2 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                {project.author}
              </span>
            )}
            <div className="flex gap-2 ml-auto">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors">
                  <GitBranch className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4 flex-grow">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">About the Project</h2>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {techStack.length > 0 && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Code2 className="w-5 h-5 text-primary" /> Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
              <h3 className="font-bold mb-2">Want to contribute?</h3>
              <p className="text-sm text-gray-400 mb-4">Join the AfterClass community and start building with us.</p>
              <a href="https://whatsapp.com/channel/0029Vb6Ld12545uxjacxJz2y" target="_blank" rel="noopener noreferrer" className="inline-flex w-full px-4 py-2 bg-primary text-white justify-center items-center rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Join Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

