import { motion } from 'framer-motion'
import { CheckCircle2, GitPullRequest, TerminalSquare, MessageSquare, Play, Github, Code, CheckSquare, Zap, Users, ShieldCheck, Flag } from 'lucide-react'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About AfterClass</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We know what it feels like to be a student without enough exposure.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="w-full py-24 px-4 flex-grow border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xl text-gray-400 leading-relaxed space-y-6">
            <p>You attend classes. You complete assignments. You prepare for exams.</p>
            <p className="font-medium text-white">But sometimes you still don't know what comes next.</p>
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-card border border-border text-left">What should you learn?</div>
              <div className="p-4 rounded-xl bg-card border border-border text-left">What do companies expect?</div>
              <div className="p-4 rounded-xl bg-card border border-border text-left">How do teams work?</div>
              <div className="p-4 rounded-xl bg-card border border-border text-left">How do you gain experience?</div>
            </div>
            <p>AfterClass exists to help students start answering those questions earlier.</p>
            <p className="text-2xl font-bold text-primary mt-8">Our goal is simple: help students become more prepared for the world beyond college.</p>
          </div>
        </div>
      </section>

      {/* STUDENT OUTCOMES */}
      <section className="w-full py-24 px-4 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Leave with more than a certificate.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Something you built", desc: "A real project you can discuss.", icon: <Code className="w-6 h-6"/> },
              { title: "GitHub experience", desc: "Actual collaboration and contributions.", icon: <Github className="w-6 h-6"/> },
              { title: "Team experience", desc: "Learn how to work with others.", icon: <Users className="w-6 h-6"/> },
              { title: "Communication", desc: "Practice presenting and explaining your work.", icon: <MessageSquare className="w-6 h-6"/> },
              { title: "Career awareness", desc: "Understand what to learn and why.", icon: <Flag className="w-6 h-6"/> },
              { title: "Portfolio", desc: "Projects you can showcase.", icon: <TerminalSquare className="w-6 h-6"/> },
              { title: "Confidence", desc: "Become more comfortable participating and speaking.", icon: <ShieldCheck className="w-6 h-6"/> },
              { title: "Professional habits", desc: "Experience with deadlines, reviews, and responsibility.", icon: <CheckSquare className="w-6 h-6"/> },
            ].map((outcome, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {outcome.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">{outcome.title}</h3>
                  <p className="text-sm text-gray-400">{outcome.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK LIKE A TEAM */}
      <section className="w-full py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Learn how real project teams work.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience the standard industry workflow before you even graduate.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-400 max-w-4xl mx-auto mb-16">
            {['Issue', 'Task', 'Branch', 'Development', 'Commit', 'Pull Request', 'Code Review', 'Merge', 'Deploy'].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <span className="px-4 py-2 rounded-lg bg-card border border-border">{step}</span>
                {i < arr.length - 1 && <span className="text-primary">→</span>}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
              <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2"><GitPullRequest className="w-5 h-5"/> What you learn</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Git/GitHub</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Task management</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Communication</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Documentation</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
              <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2"><Zap className="w-5 h-5"/> What you experience</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Code reviews</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Testing & Deployment</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Team meetings</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Presentations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
