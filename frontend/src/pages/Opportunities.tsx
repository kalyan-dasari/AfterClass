import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, DollarSign, Calendar, ExternalLink, ArrowRight } from 'lucide-react'
import { api } from '../api'

export default function Opportunities() {
  const [opps, setOpps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getOpportunities().then(data => {
      setOpps(Array.isArray(data) ? data : [])
    }).catch(() => setOpps([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Opportunities</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find opportunities to learn, build, compete and grow.
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading opportunities...</div>
          ) : opps.length === 0 ? (
            <div className="text-center py-20 border border-border rounded-2xl bg-card">
              <h3 className="text-xl font-bold mb-2">No opportunities yet.</h3>
              <p className="text-gray-400">Join the community for announcements when new opportunities arrive.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {opps.map((opp, i) => (
                <motion.div 
                  key={opp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-primary/20">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold">{opp.title}</h3>
                        {opp.tag && <span className="text-xs px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 font-medium uppercase tracking-wider">{opp.tag}</span>}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 bg-background/50 p-2 px-3 rounded-lg border border-border/50">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {opp.location}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {opp.type}</span>
                        {opp.extra && <span className="flex items-center gap-1.5 text-green-400"><DollarSign className="w-4 h-4"/> {opp.extra}</span>}
                      </div>
                    </div>
                  </div>
                  <a 
                    href={opp.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    {opp.action || 'Apply'} <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
