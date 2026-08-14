import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Code2, Zap, ArrowRight, GitBranch, Globe } from 'lucide-react'
import { api } from '../api'

export default function Members() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getMembers().then(data => {
      setMembers(Array.isArray(data) ? data : [])
    }).catch(() => setMembers([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Wall of Learners</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Meet the builders, thinkers, and creators of the AfterClass community.</p>
        </div>
      </section>

      <section className="w-full py-20 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading members...</div>
          ) : members.length === 0 ? (
            <div className="text-center py-20 border border-border rounded-2xl bg-card">
              <h3 className="text-xl font-bold mb-2">The wall is currently empty.</h3>
              <p className="text-gray-400">Join the community and become the first learner on the wall.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, i) => {
                const skills = member.skills ? member.skills.split(',').map((s: string) => s.trim()) : []
                
                return (
                  <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border flex flex-col hover:border-primary/50 transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-background rounded-full border-2 border-border group-hover:border-primary transition-colors flex items-center justify-center shrink-0 overflow-hidden">
                        <User className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        {member.role && <p className="text-sm text-primary font-medium">{member.role}</p>}
                        {member.tag && <p className="text-xs text-gray-500 mt-1">{member.tag}</p>}
                      </div>
                    </div>

                    {member.quote && <p className="text-gray-400 text-sm mb-6 flex-grow">"{member.quote}"</p>}

                    <div className="space-y-4 mt-auto">
                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((s: string, j: number) => (
                            <span key={j} className="text-xs px-2 py-1 bg-background rounded-md text-gray-300 border border-border">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-4 pt-4 border-t border-border/50">
                        {member.projects > 0 && (
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Code2 className="w-4 h-4"/> {member.projects} Projects
                          </div>
                        )}
                        {member.commits > 0 && (
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Zap className="w-4 h-4"/> {member.commits} Commits
                          </div>
                        )}
                        <div className="ml-auto flex gap-2">
                          <button className="text-gray-500 hover:text-white transition-colors" title="GitHub"><GitBranch className="w-4 h-4"/></button>
                          <button className="text-gray-500 hover:text-primary transition-colors" title="Portfolio / LinkedIn"><Globe className="w-4 h-4"/></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="w-full py-20 px-4 bg-card/50 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want to be part of the Wall of Learners?</h2>
          <p className="text-gray-400 mb-8">Join the community, start building, and showcase your skills.</p>
          <a href="https://chat.whatsapp.com/HMIK7feuFaPHtsUhU42WD3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors gap-2">
            Join AfterClass <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  )
}
