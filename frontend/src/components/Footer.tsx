import { MapPin, Mail, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      {/* Association Banner */}
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-sm sm:text-base font-medium text-foreground/90">
            Proudly associated with{' '}
            <span className="text-primary font-semibold">Siri Deluxe Boys Hostel</span>
            , Maisammaguda
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
                <img src="/afterclass-logo.svg" alt="AfterClass logo" className="h-6 w-6 shrink-0" />
              <span className="font-bold text-xl tracking-tight">AfterClass</span>
            </Link>
            <p className="text-sm text-foreground/70 leading-relaxed">
              A student community platform built for collaboration, learning, and growth beyond the classroom.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link to="/opportunities" className="hover:text-primary transition-colors">Opportunities</Link></li>
              <li><Link to="/members" className="hover:text-primary transition-colors">Members</Link></li>
            </ul>
          </div>

          {/* Contact / Address */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Maisammaguda, Medchal, Telangana</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <a href="https://www.instagram.com/after_class__?igsh=MXI3M3dxdnFleWp0OQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@after_class__</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>connect@afterclass.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} AfterClass. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by AfterClass Community
          </p>
        </div>
      </div>
    </footer>
  )
}
