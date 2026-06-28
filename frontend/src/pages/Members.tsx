import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Code2, Award, Zap } from 'lucide-react'
import { api } from '../api'

export default function Members() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getMembers().then(data => {
      setMembers(Array.isArray(data) ? data : [])
    }).catch(() => setMembers([])).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="max-w-6xl mx-auto py-20 px-4"><p className="text-gray-400">Loading...</p></div>

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Wall of Learners</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Meet the builders, thinkers, and creators of the AfterClass community.</p>
      </div>

      {members.length === 0 ? (
        <p className="text-gray-500 text-center">No members yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, i) => {
            const skills = member.skills ? member.skills.split(',').map((s: string) => s.trim()) : []
            let badges: { icon: React.ReactNode; label: string }[] = []
            try {
              const parsed = member.badges ? JSON.parse(member.badges) : []
              badges = Array.isArray(parsed) ? parsed.map((b: string) => ({ icon: <Award className="w-4 h-4"/>, label: b })) : []
            } catch { badges = [] }

            return (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border flex flex-col relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-background rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    {member.role && <p className="text-sm text-primary font-medium">{member.role}</p>}
                    {member.tag && <p className="text-xs text-gray-500">{member.tag}</p>}
                  </div>
                </div>

                {member.quote && <p className="text-gray-300 italic mb-6">"{member.quote}"</p>}

                <div className="space-y-4 mt-auto border-t border-border/50 pt-4">
                  {skills.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-500 mb-2">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s: string, j: number) => (
                          <span key={j} className="text-xs px-2 py-1 bg-background rounded text-gray-300">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
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
                  </div>

                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {badges.map((b, j) => (
                        <div key={j} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                          {b.icon} {b.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
