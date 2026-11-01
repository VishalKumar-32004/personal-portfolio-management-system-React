
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Dashboard from './Dashboard.jsx'

const initialProjects = [
  {
    id: 1,
    title: 'Student Result Management',
    category: 'JavaScript',
    description: 'Interactive result management interface for academic records.',
    tech: 'HTML • CSS • JavaScript'
  },
  {
    id: 2,
    title: 'Weather Information Dashboard',
    category: 'JavaScript',
    description: 'Responsive dashboard with location search and dynamic cards.',
    tech: 'HTML • CSS • JavaScript'
  },
  {
    id: 3,
    title: 'Personal Portfolio',
    category: 'Web',
    description: 'Portfolio platform with authentication and content management.',
    tech: 'HTML • CSS • JavaScript'
  }
]

const skills = [
  ['HTML5', 'Semantic structure', 'Core', '90%'],
  ['CSS3', 'Grid • Flexbox • Responsive UI', 'Core', '88%'],
  ['JavaScript', 'DOM • Events • LocalStorage', 'Core', '84%'],
  ['Git & GitHub', 'Version control • Deployment', 'Tools', '78%'],
  ['UI/UX Basics', 'Layout • Visual hierarchy', 'Design', '82%'],
  ['Problem Solving', 'Logic • Debugging • Iteration', 'Practice', '86%']
]

const certificates = [
  {
    title: 'Python Developer',
    image: '/images/python-developer.png',
    description: 'Course certificate issued on 18 March 2026.'
  },
  {
    title: 'Introduction to Python',
    image: '/images/intro-python.png',
    description: 'Course certificate issued on 29 March 2026.'
  },
  {
    title: 'Smart India Hackathon 2025',
    image: '/images/sih-2025-demo.png',
    description: 'Project concept showcase — not an official participation certificate.'
  }
]

function App() {
  const location = useLocation()

  // GLOBAL DARK / LIGHT THEME
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  const ThemeButton = () => (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
      aria-label="Change color theme"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )

  const [projects] = useState(() =>
    JSON.parse(localStorage.getItem('projects') || 'null') || initialProjects
  )

  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [certificate, setCertificate] = useState(null)

  const [blogs] = useState(() =>
    JSON.parse(localStorage.getItem('blogs') || 'null') || [
      {
        id: 1,
        title: 'Why Responsive Design Matters',
        category: 'Web Development',
        description: 'How responsive layouts improve user experience across devices.'
      },
      {
        id: 2,
        title: 'Understanding LocalStorage',
        category: 'JavaScript',
        description: 'How browser LocalStorage can persist application data.'
      },
      {
        id: 3,
        title: 'Grid vs Flexbox',
        category: 'CSS',
        description: 'When to use Grid and Flexbox in web development.'
      }
    ]
  )

  const filteredProjects = projects.filter(project => {
    const matchesFilter =
      filter === 'All' || project.category === filter

    const matchesSearch =
      `${project.title} ${project.description} ${project.tech}`
        .toLowerCase()
        .includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // LOGIN PAGE
  if (location.pathname === '/login') {
    return (
      <>
        <ThemeButton />
        <Login />
      </>
    )
  }

  // SIGNUP PAGE
  if (location.pathname === '/signup') {
    return (
      <>
        <ThemeButton />
        <Signup />
      </>
    )
  }

  // ADMIN AND USER DASHBOARD
  if (
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/user-dashboard'
  ) {
    return (
      <>
        <ThemeButton />
        <Dashboard />
      </>
    )
  }

  return (
    <>
      <div className="scroll-progress"></div>

      <header>
        <a className="brand" href="#home">
          <b>V</b> Vishal
        </a>

        <button id="menu" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={menuOpen ? 'mobile-open' : ''}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#achievements" onClick={() => setMenuOpen(false)}>Achievements</a>
          <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="login" href="/login">Login</a>
          <ThemeButton />
        </nav>
      </header>

      <main>
        {/* HOME SECTION */}
        <section id="home" className="hero">
          <div>
            <small>PERSONAL PORTFOLIO MANAGEMENT SYSTEM</small>

            <h1>
              Ideas into <em>digital experiences.</em>
            </h1>

            <p>
              A modern portfolio platform to showcase skills,
              projects, achievements and professional work in one place.
            </p>

            <a className="btn" href="#projects">View Projects →</a>
            <a className="btn ghost" href="#contact">Contact Me</a>

            <a
              className="btn ghost"
              href="https://www.linkedin.com/in/vishal-kumar-35aa56414/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>

            <a
              className="btn ghost"
              href="https://github.com/vishalsingh99547-design"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <div className="stats">
              <div><b>{projects.length}</b><span>Projects</span></div>
              <div><b>6</b><span>Skills</span></div>
              <div><b>100%</b><span>Passion</span></div>
            </div>
          </div>

          <div className="hero-card">
            <div className="avatar">VK</div>
            <small>AVAILABLE FOR</small>
            <h2>Projects & Opportunities</h2>
            <p>● Open to collaboration</p>
            <div className="code">
              HTML • CSS • JavaScript
              <small>Creative • Responsive • Functional</small>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <small>ABOUT ME</small>
          <h2>Turning learning into <em>real projects.</em></h2>

          <div className="grid three">
            {[
              ['01', 'Who I Am', 'Computer Science student interested in web development and practical software projects.'],
              ['02', 'What I Do', 'I create responsive interfaces and interactive web applications.'],
              ['03', 'My Goal', 'To improve technical skills by building useful real-world solutions.']
            ].map(item => (
              <article key={item[0]}>
                <b>{item[0]}</b>
                <h3>{item[1]}</h3>
                <p>{item[2]}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="dark skills-section">
          <small>EXPERTISE</small>
          <h2>Skills, tools & <em>technologies.</em></h2>

          <div className="skill-showcase">
            <div className="skill-groups">
              {skills.map((skill, index) => (
                <article className="skill-card" key={skill[0]}>
                  <div className="skill-number">0{index + 1}</div>

                  <div className="skill-card-head">
                    <div>
                      <span className="skill-category">{skill[2]}</span>
                      <h3>{skill[0]}</h3>
                    </div>
                    <strong>{skill[3]}</strong>
                  </div>

                  <p>{skill[1]}</p>

                  <div className="bar">
                    <i style={{ width: skill[3] }}></i>
                  </div>

                  <div className="skill-foot">
                    <span>Project-ready</span>
                    <span>↗</span>
                  </div>
                </article>
              ))}
            </div>

            <aside className="toolkit-card">
              <small>MY TOOLKIT</small>
              <h3>Building clean interfaces with purpose.</h3>
              <p>
                I combine structure, visual design and JavaScript
                interactions to create useful web experiences.
              </p>

              <div className="tech-cloud">
                {['HTML5', 'CSS3', 'JavaScript', 'React', 'Git & GitHub', 'LocalStorage'].map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <small>SELECTED WORK</small>
          <h2>Featured <em>projects.</em></h2>

          <div className="project-tools">
            <div className="searchbox">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="filters">
              {['All', 'Web', 'JavaScript'].map(item => (
                <button
                  key={item}
                  className={filter === item ? 'active' : ''}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid three">
            {filteredProjects.map((project, index) => (
              <article
                className="project-card"
                key={project.id}
                onClick={() => setSelected({ ...project, type: 'project' })}
              >
                <div className="pic">
                  <span>0{index + 1}</span>
                  <small>VIEW CASE</small>
                </div>

                <div className="body">
                  <span className="tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech">{project.tech}</div>
                  <span className="open-link">View details →</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="dark achievements-section">
          <small>PROOF OF LEARNING</small>
          <h2>Achievements & <em>certificates.</em></h2>

          <div className="certificate-grid">
            {certificates.map(item => (
              <article
                className="certificate-card"
                key={item.title}
                onClick={() => setCertificate(item)}
              >
                <div className="certificate-thumb">
                  <img src={item.image} alt={item.title} />
                  <span>VIEW CERTIFICATE ↗</span>
                </div>

                <div className="certificate-info">
                  <span className="tag">CERTIFICATE / SHOWCASE</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <small>Click to view</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* BLOG SECTION */}
        <section id="blog">
          <small>THOUGHTS & LEARNING</small>
          <h2>Latest <em>articles.</em></h2>

          <div className="grid three">
            {blogs.map(blog => (
              <article
                className="blog-card"
                key={blog.id}
                onClick={() => setSelected({ ...blog, type: 'blog' })}
              >
                <span className="tag">{blog.category}</span>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <span className="open-link">Read preview →</span>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="contact contact-modern">
          <div className="contact-copy">
            <small>GET IN TOUCH</small>
            <h2>Let's build something <em>worth showing.</em></h2>
            <p>
              Have a project idea, collaboration thought or feedback?
              Send a message.
            </p>
          </div>

          <form
            className="contact-card"
            onSubmit={e => {
              e.preventDefault()
              alert('Message submitted successfully!')
              e.target.reset()
            }}
          >
            <h3>Start a conversation</h3>
            <label>Name<input required placeholder="Your name" /></label>
            <label>Email<input type="email" required placeholder="Your email" /></label>
            <label>Subject<input required placeholder="Subject" /></label>
            <label>Message<textarea rows="5" required placeholder="Your message"></textarea></label>
            <button className="btn" type="submit">Send Message →</button>
          </form>
        </section>

        {/* WORKFLOW SECTION */}
        <section className="workflow">
          <small>HOW IT WORKS</small>
          <h2>From idea to <em>working system.</em></h2>

          <div className="flow-grid">
            {['Discover', 'Interact', 'Authenticate', 'Manage'].map((item, index) => (
              <div key={item}>
                <b>0{index + 1}</b>
                <strong>{item}</strong>
                <span>Explore and manage portfolio information.</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <a className="brand" href="#home"><b>V</b> Vishal</a>
        <span>Personal Portfolio Management System • © 2026</span>
        <button
          className="backtop"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </footer>

      {/* PROJECT / BLOG DETAILS MODAL */}
      {selected && (
        <div className="detail-modal show" onClick={() => setSelected(null)}>
          <div className="detail-box" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setSelected(null)}>×</button>

            <small className="modal-kicker">
              {selected.type === 'project' ? 'PROJECT DETAILS' : 'ARTICLE PREVIEW'}
            </small>

            <span className="tag">{selected.category}</span>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>

            {selected.tech && (
              <div className="detail-tech">Technologies: {selected.tech}</div>
            )}
          </div>
        </div>
      )}

      {/* CERTIFICATE PREVIEW */}
      {certificate && (
        <div className="certificate-modal show" onClick={() => setCertificate(null)}>
          <div className="certificate-viewer" onClick={e => e.stopPropagation()}>
            <button className="certificate-close" onClick={() => setCertificate(null)}>×</button>
            <h3>{certificate.title}</h3>
            <img src={certificate.image} alt={certificate.title} />
          </div>
        </div>
      )}
    </>
  )
}

export default App
