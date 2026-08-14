import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Rocket, Target, Code, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="flex flex-col items-center">
      {/* SECTION 1 - HERO */}
      <section className="w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden pt-20 pb-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-30 -z-10 pointer-events-none" />
        
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight"
          >
            College teaches you the syllabus.<br className="hidden md:block"/>
            <span className="text-primary">We help you prepare for what comes after it.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            AfterClass is a student community for practical learning, real projects, collaboration, industry exposure and career readiness.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="https://chat.whatsapp.com/HMIK7feuFaPHtsUhU42WD3" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group text-lg">
              Join AfterClass
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/projects" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-muted transition-all flex items-center justify-center gap-2 text-lg">
              Explore Projects
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 text-sm md:text-base font-medium text-gray-400 uppercase tracking-wider">
            <span>Learn</span> <span className="text-primary">•</span>
            <span>Build</span> <span className="text-primary">•</span>
            <span>Collaborate</span> <span className="text-primary">•</span>
            <span>Experience</span> <span className="text-primary">•</span>
            <span>Grow</span>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 - THE GAP */}
      <section className="w-full py-24 px-4 bg-card/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">There is a gap between college and the real world.</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              College gives you a foundation. But many students don't get enough opportunities to understand what comes next.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
             {[
               "What should I learn outside the syllabus?",
               "Which technology or career path should I choose?",
               "What do companies actually expect?",
               "How do real teams work?",
               "How do I get practical experience?",
               "How do I build a strong portfolio?"
             ].map((q, i) => (
               <div key={i} className="p-6 rounded-2xl bg-card border border-border flex items-start gap-3">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">?</div>
                 <p className="text-gray-300 font-medium">{q}</p>
               </div>
             ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-8">AfterClass exists to help bridge that gap.</h3>
            <div className="flex flex-col items-center gap-4 text-lg font-bold text-gray-500 uppercase tracking-widest">
              <span>College</span>
              <div className="w-px h-8 bg-border" />
              <span className="text-primary">AfterClass</span>
              <div className="w-px h-8 bg-border" />
              <span className="text-foreground">Career</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - WHAT IS AFTERCLASS? */}
      <section className="w-full py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">More than a community.</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A place where students learn together, build together and grow together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <BookOpen className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">Learn</h3>
                <p className="text-gray-400 leading-relaxed">Practical skills, career paths, roadmaps and industry awareness.</p>
             </div>
             <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <Code className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">Build</h3>
                <p className="text-gray-400 leading-relaxed">Real projects that students can contribute to and showcase.</p>
             </div>
             <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <Users className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">Collaborate</h3>
                <p className="text-gray-400 leading-relaxed">Work with other students and experience teamwork.</p>
             </div>
             <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <LayoutDashboard className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">Experience</h3>
                <p className="text-gray-400 leading-relaxed">Project internships, hackathons, events and practical activities.</p>
             </div>
             <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <Target className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">Prepare</h3>
                <p className="text-gray-400 leading-relaxed">Resume, LinkedIn, GitHub, communication and interview preparation.</p>
             </div>
             <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <Rocket className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">Grow</h3>
                <p className="text-gray-400 leading-relaxed">Confidence, discipline, leadership and professional habits.</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - START EARLY */}
      <section className="w-full py-24 px-4 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Your career preparation shouldn't start in final year.</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              You don't have to know everything today. You just need to start earlier.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow text-primary font-bold">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-border">
                <h4 className="font-bold text-xl mb-2 text-white">1st Year: Explore</h4>
                <p className="text-gray-400">Discover technology, career paths and areas of interest.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow text-primary font-bold">2</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-border">
                <h4 className="font-bold text-xl mb-2 text-white">2nd Year: Build</h4>
                <p className="text-gray-400">Learn practical skills and start creating projects.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow text-primary font-bold">3</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-border">
                <h4 className="font-bold text-xl mb-2 text-white">3rd Year: Experience</h4>
                <p className="text-gray-400">Work on team projects, internships, hackathons and practical activities.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow text-primary font-bold">4</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-border">
                <h4 className="font-bold text-xl mb-2 text-white">4th Year: Prepare</h4>
                <p className="text-gray-400">Focus on placements, interviews, resumes, DSA, aptitude and career opportunities.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 14 - WHY AFTERCLASS EXISTS */}
      <section className="w-full py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">We know what it feels like to be a student without enough exposure.</h2>
          <div className="text-xl text-gray-400 leading-relaxed space-y-6 mb-12">
            <p>You attend classes. You complete assignments. You prepare for exams.</p>
            <p className="font-medium text-white">But sometimes you still don't know what comes next.</p>
            <div className="py-4 space-y-2">
              <p>What should you learn?</p>
              <p>What do companies expect?</p>
              <p>How do teams work?</p>
              <p>How do you gain experience before your first job?</p>
            </div>
            <p>AfterClass exists to help students start answering those questions earlier.</p>
            <p className="text-2xl font-bold text-primary">Our goal is simple: help students become more prepared for the world beyond college.</p>
          </div>
        </div>
      </section>

      {/* SECTION 15 - FINAL CTA */}
      <section className="w-full py-24 px-4 bg-card/50 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Your career shouldn't begin in your final year.</h2>
          <p className="text-xl text-gray-400 mb-10">Start exploring. Start building. Start preparing.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://chat.whatsapp.com/HMIK7feuFaPHtsUhU42WD3" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-lg">
              Join AfterClass
            </a>
            <Link to="/projects" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-muted transition-all flex items-center justify-center gap-2 text-lg">
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
