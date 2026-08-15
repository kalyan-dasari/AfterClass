import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Learn', path: '/resources' },
    { name: 'Projects', path: '/projects' },
    { name: 'Project Internships', path: '/internships' },
    { name: 'Wall of Learners', path: '/members' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="AfterClass logo" className="h-8 w-8 shrink-0" />
              <span className="font-bold text-xl tracking-tight">AfterClass</span>
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
              <a href="https://chat.whatsapp.com/HMIK7feuFaPHtsUhU42WD3" target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ml-2">
                Join AfterClass
              </a>
            </div>
          </div>
          
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-card hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="https://chat.whatsapp.com/HMIK7feuFaPHtsUhU42WD3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white mt-4 text-center"
                onClick={() => setIsOpen(false)}
              >
                Join AfterClass
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

