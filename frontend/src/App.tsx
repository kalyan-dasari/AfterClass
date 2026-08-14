import { Navigate, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Opportunities from './pages/Opportunities'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Members from './pages/Members'
import Internships from './pages/Internships'
import InternshipDetails from './pages/InternshipDetails'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AgentChat from './pages/AgentChat'

function RequireAdmin({ children }: { children: React.ReactNode }) {
  if (!localStorage.getItem('admin_token')) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/members" element={<Members />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        </Routes>
      </main>
      <Footer />
      <AgentChat />
    </div>
  )
}

export default App
