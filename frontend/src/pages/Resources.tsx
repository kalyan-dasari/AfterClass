import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Code, Terminal, Video, ArrowRight } from 'lucide-react'
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

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn beyond the classroom.</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Curated resources to help you learn the skills you actually need.
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          {loading ? (
             <div className="text-center py-20 text-gray-400">Loading resources...</div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20 border border-border rounded-2xl bg-card">
              <h3 className="text-xl font-bold mb-2">No resources available.</h3>
              <p className="text-gray-400">We are currently gathering the best learning materials for you.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((res, i) => (
                <motion.div 
                  key={res.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all group flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-background rounded-2xl border border-border group-hover:border-primary transition-colors flex items-center justify-center text-primary">
                      {iconMap[res.tag] || <BookOpen className="w-6 h-6" />}
                    </div>
                    {res.tag && <span className="text-xs font-bold text-primary uppercase tracking-wider px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">{res.tag}</span>}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{res.title}</h3>
                  <p className="text-gray-400 text-base mb-8 flex-grow leading-relaxed">{res.description}</p>
                  
                  {res.link && (
                    <a href={res.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors group/link">
                      Open Resource <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
