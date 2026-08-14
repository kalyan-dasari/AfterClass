import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, DollarSign, ExternalLink, Briefcase } from 'lucide-react'
import { api } from '../api'

export default function InternshipDetails() {
  const { id } = useParams()
  const [internship, setInternship] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getInternships().then(data => {
      if (Array.isArray(data)) {
        const found = data.find(p => p.id === Number(id))
        setInternship(found || null)
      }
    }).catch(() => setInternship(null)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="max-w-4xl mx-auto py-24 px-4 text-center text-gray-400">Loading internship...</div>
  
  if (!internship) return (
    <div className="max-w-4xl mx-auto py-24 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Internship Not Found</h2>
      <Link to="/internships" className="text-primary hover:underline flex items-center justify-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Internships
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-16 px-4 border-b border-border bg-card/30">
        <div className="max-w-4xl mx-auto">
          <Link to="/internships" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Internships
          </Link>
          
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center shrink-0 hidden sm:flex">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl md:text-5xl font-bold">{internship.title}</h1>
                {internship.tag && <span className="px-3 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium uppercase">{internship.tag}</span>}
              </div>
              {internship.company && <p className="text-xl text-primary font-medium mb-6">{internship.company}</p>}
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> {internship.location || 'Remote'}</span>
                {internship.duration && <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> {internship.duration}</span>}
                {internship.stipend && <span className="flex items-center gap-2 text-green-400"><DollarSign className="w-4 h-4" /> {internship.stipend}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4 flex-grow">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">About this Internship</h2>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                {internship.description}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-bold mb-4 text-center">Ready to join?</h3>
              <a 
                href={internship.google_form_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-500 text-center mt-4">Make sure you have an updated resume before applying.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
