import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, DollarSign, Calendar } from 'lucide-react'
import { api } from '../api'

export default function Opportunities() {
  const [opps, setOpps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getOpportunities().then(data => {
      setOpps(Array.isArray(data) ? data : [])
    }).catch(() => setOpps([])).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 px-4"><p className="text-gray-400">Loading...</p></div>

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Latest Opportunities</h1>
        <p className="text-gray-400">Find internships, hackathons, and bootcamps to kickstart your career.</p>
      </div>

      {opps.length === 0 ? (
        <p className="text-gray-500">No opportunities yet.</p>
      ) : (
        <div className="space-y-4">
          {opps.map((opp, i) => (
            <motion.div 
              key={opp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-xl bg-card border border-border hover:bg-border/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{opp.title}</h3>
                    {opp.tag && <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-medium">{opp.tag}</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {opp.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {opp.type}</span>
                    {opp.extra && <span className="flex items-center gap-1 text-green-400"><DollarSign className="w-4 h-4"/> {opp.extra}</span>}
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                {opp.action || 'Apply'}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
