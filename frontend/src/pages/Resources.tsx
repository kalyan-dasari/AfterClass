import { motion } from 'framer-motion'
import { BookOpen, Code, Terminal, Video } from 'lucide-react'

export default function Resources() {
  const resources = [
    { title: "GitHub Guide", desc: "Beginner roadmap to start contributing", icon: <Code className="w-6 h-6"/>, tag: "Guide" },
    { title: "AI Tools Collection", desc: "Best AI tools for students", icon: <Terminal className="w-6 h-6"/>, tag: "List" },
    { title: "Resume Templates", desc: "ATS friendly templates", icon: <BookOpen className="w-6 h-6"/>, tag: "Assets" },
    { title: "Free Courses", desc: "Curated tech courses", icon: <Video className="w-6 h-6"/>, tag: "Learning" },
  ]

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Resources Library</h1>
        <p className="text-gray-400">Curated materials to help you grow beyond the classroom.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              {res.icon}
            </div>
            <span className="text-xs font-semibold text-primary mb-2 inline-block px-2 py-1 bg-primary/10 rounded-md">{res.tag}</span>
            <h3 className="text-xl font-bold mb-2">{res.title}</h3>
            <p className="text-gray-400 text-sm">{res.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
