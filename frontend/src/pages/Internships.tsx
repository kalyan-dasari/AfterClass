import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, DollarSign, ExternalLink, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
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

  const processSteps = [
    { num: '01', title: 'Choose', desc: 'Choose a project/domain based on your interests and skill level.' },
    { num: '02', title: 'Learn', desc: 'Get the resources and guidance needed to contribute.' },
    { num: '03', title: 'Collaborate', desc: 'Work with a small student team.' },
    { num: '04', title: 'Build', desc: 'Complete real project tasks.' },
    { num: '05', title: 'Review', desc: 'Receive mentor feedback and progress reviews.' },
    { num: '06', title: 'Ship', desc: 'Deploy and showcase your work.' },
    { num: '07', title: 'Grow', desc: 'Use your project experience and contributions in your portfolio.' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Don't just collect an internship certificate.<br className="hidden md:block"/> <span className="text-primary">Build something.</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our project-based internship experience gives students the opportunity to work in teams, contribute to real projects, receive mentorship, learn professional workflows and showcase what they've built.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="w-full py-24 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border relative overflow-hidden group">
                <div className="text-5xl font-black text-border/50 absolute -top-4 -right-2 group-hover:text-primary/10 transition-colors">{step.num}</div>
                <h3 className="text-xl font-bold mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-400 text-sm relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A certificate is not experience.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-xl font-bold text-gray-400 mb-6 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Typical Certificate Internship
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-2"><span className="text-gray-600 mt-1">•</span> PDF/task-based work</li>
                <li className="flex items-start gap-2"><span className="text-gray-600 mt-1">•</span> Mostly individual submissions</li>
                <li className="flex items-start gap-2"><span className="text-gray-600 mt-1">•</span> Limited mentorship</li>
                <li className="flex items-start gap-2"><span className="text-gray-600 mt-1">•</span> Certificate-focused</li>
                <li className="flex items-start gap-2"><span className="text-gray-600 mt-1">•</span> Little collaboration</li>
                <li className="flex items-start gap-2"><span className="text-gray-600 mt-1">•</span> Limited portfolio value</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> AfterClass Project Experience
              </h3>
              <ul className="space-y-4 text-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Real project work</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Team collaboration</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Mentor guidance</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Weekly progress reviews</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> GitHub workflow</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Deployment & Final showcase</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COHORTS */}
      <section className="w-full py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Internships</h2>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading internships...</div>
          ) : internships.length === 0 ? (
            <div className="text-center py-20 border border-border rounded-2xl bg-card">
              <h3 className="text-xl font-bold mb-2">No active cohorts right now.</h3>
              <p className="text-gray-400">Check back later or join the community for announcements.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {internships.map((intern, i) => (
                <motion.div
                  key={intern.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row items-start justify-between p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold">{intern.title}</h3>
                      {intern.tag && <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-medium">{intern.tag}</span>}
                    </div>
                    {intern.company && <p className="text-primary font-medium mb-4">{intern.company}</p>}
                    {intern.description && <p className="text-gray-400 mb-6">{intern.description}</p>}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 bg-background/50 p-4 rounded-xl border border-border/50">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> {intern.location || 'Remote'}</span>
                      {intern.duration && <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> {intern.duration}</span>}
                      {intern.stipend && <span className="flex items-center gap-2 text-green-400"><DollarSign className="w-4 h-4" /> {intern.stipend}</span>}
                    </div>
                  </div>
                  <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
                    <a
                      href={intern.google_form_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Apply Now <ExternalLink className="w-4 h-4" />
                    </a>
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
