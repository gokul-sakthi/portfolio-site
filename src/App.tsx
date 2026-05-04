import './index.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Nav }        from '@/components/sections/Nav'
import { Hero }       from '@/components/sections/Hero'
import { About }      from '@/components/sections/About'
import { Skills }     from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Projects }   from '@/components/sections/Projects'
import { Education }  from '@/components/sections/Education'
import { Footer }     from '@/components/sections/Footer'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
