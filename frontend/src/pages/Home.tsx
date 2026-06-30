import { motion } from 'framer-motion'
import { ArrowRight, Terminal, BookOpen, Users, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Abstract background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-glow rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none" />
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Version 1.0 is live
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Your growth starts <br className="hidden md:block"/>
            <span className="text-primary">after the class ends.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            A student community where learners build skills, create projects, explore AI, find opportunities, and prepare for the real world.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://chat.whatsapp.com/HMIK7feuFaPHtsUhU42WD3" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
              Join Community
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/resources" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-card border border-border text-foreground font-medium hover:bg-border/50 transition-all flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Explore Resources
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto w-full border-t border-border pt-10"
        >
          {[
            { label: 'Students Connected', value: '50+' },
            { label: 'Resources Shared', value: '20+' },
            { label: 'Projects Building', value: '5+' },
            { label: 'Learning Opportunities', value: '∞' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>
      
      {/* "What We Do" teaser could go here */}
      <section className="w-full py-24 px-4 bg-card/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">More than just coding. We prepare you for the industry.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <Terminal className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Skill Building</h3>
                <p className="text-gray-400 text-sm">Programming, AI tools, Development, Git/GitHub, and Communication skills.</p>
             </div>
             <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <Rocket className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Build Together</h3>
                <p className="text-gray-400 text-sm">Collaborate on projects, open source, hackathons, and startup ideas.</p>
             </div>
             <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="text-gray-400 text-sm">A place to ask doubts, share progress, and meet fellow builders.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
