import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About AfterClass</h1>
        <div className="prose prose-invert max-w-none text-lg text-gray-300 space-y-6">
          <p>
            In college, many students want to grow but don't know where to start. Opportunities, tools, guidance, and exposure often reach only a few people.
          </p>
          <p>
            AfterClass was started with a simple idea — create a place where students learn beyond academics and prepare themselves for the industry.
          </p>
          <p>
            We believe real-world problem solving, building projects, and sharing knowledge creates better engineers.
          </p>
        </div>

        <div className="mt-12 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">Our Core Values</h2>
          <ul className="space-y-4">
            {[
              "Community over Competition",
              "Build in Public",
              "Continuous Learning",
              "Real-world Preparedness"
            ].map((value, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-3 text-lg"
              >
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span>{value}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
