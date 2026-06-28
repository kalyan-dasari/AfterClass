import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, DollarSign, ExternalLink } from 'lucide-react'
import { api } from '../api'

export default function Internships() {
  const [internships, setInternships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getInternships().then(data => {
      setInternships(Array.isArray(data) ? data : [])
    }).catch(() => {
      setInternships([])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4">
        <p className="text-gray-400">Loading internships...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Internships</h1>
        <p className="text-gray-400">Find internships and kickstart your career. Click Apply to fill the Google Form.</p>
      </div>

      {internships.length === 0 ? (
        <p className="text-gray-500">No internships listed yet. Check back soon!</p>
      ) : (
        <div className="space-y-4">
          {internships.map((intern, i) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-xl bg-card border border-border hover:bg-border/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4 md:mb-0 flex-1 min-w-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-xl font-bold">{intern.title}</h3>
                    {intern.tag && <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-medium">{intern.tag}</span>}
                  </div>
                  {intern.company && <p className="text-sm text-primary font-medium mb-2">{intern.company}</p>}
                  {intern.description && <p className="text-sm text-gray-400 mb-2 line-clamp-2">{intern.description}</p>}
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {intern.location || 'Remote'}</span>
                    {intern.duration && <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {intern.duration}</span>}
                    {intern.stipend && <span className="flex items-center gap-1 text-green-400"><DollarSign className="w-4 h-4" /> {intern.stipend}</span>}
                  </div>
                </div>
              </div>
              <a
                href={intern.google_form_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                Apply <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
