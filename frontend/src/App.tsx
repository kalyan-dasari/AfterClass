import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Opportunities from './pages/Opportunities'
import Projects from './pages/Projects'
import Members from './pages/Members'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
