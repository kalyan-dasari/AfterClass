import { motion } from 'framer-motion'
import { GitBranch, ExternalLink } from 'lucide-react'

export default function Projects() {
  const projects = [
    { 
      title: "GitCommily", 
      desc: "GitHub contribution tracker to help students maintain consistency.", 
      author: "Kalyan", 
      tech: ["React", "FastAPI", "Tailwind"],
      github: "#",
      demo: "#"
    },
    { 
      title: "Campus Connect", 
      desc: "A platform for sharing campus notes and previous year questions.", 
      author: "Priya", 
      tech: ["Next.js", "Supabase"],
      github: "#",
      demo: "#"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects Showcase</h1>
        <p className="text-gray-400">See what our community members are building.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{proj.title}</h3>
              <div className="flex gap-2">
                <a href={proj.github} className="p-2 bg-background rounded-full hover:text-primary transition-colors"><GitBranch className="w-5 h-5"/></a>
                <a href={proj.demo} className="p-2 bg-background rounded-full hover:text-primary transition-colors"><ExternalLink className="w-5 h-5"/></a>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 flex-grow">{proj.desc}</p>
            
            <div className="mt-auto">
              <div className="text-sm text-gray-500 mb-3">Built by: <span className="text-foreground font-medium">{proj.author}</span></div>
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
