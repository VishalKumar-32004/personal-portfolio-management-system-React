import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/dashboard.css';

const defaultProjects = [
  { id: 1, title: 'Student Result Management', category: 'JavaScript', description: 'Interactive result management interface for academic records.', tech: 'HTML • CSS • JavaScript' },
  { id: 2, title: 'Weather Information Dashboard', category: 'JavaScript', description: 'Responsive dashboard with location search and dynamic cards.', tech: 'HTML • CSS • JavaScript' },
  { id: 3, title: 'Personal Portfolio', category: 'Web', description: 'Portfolio platform with authentication and content management.', tech: 'HTML • CSS • JavaScript' }
];

const defaultSkills = [
  { id: 1, name: 'HTML5', description: 'Semantic structure', level: '90%' },
  { id: 2, name: 'CSS3', description: 'Grid, Flexbox, Responsive UI', level: '88%' },
  { id: 3, name: 'JavaScript', description: 'DOM, Events, LocalStorage', level: '84%' },
  { id: 4, name: 'Git & GitHub', description: 'Version control and deployment', level: '78%' },
  { id: 5, name: 'UI/UX Basics', description: 'Layout and visual hierarchy', level: '82%' },
  { id: 6, name: 'Problem Solving', description: 'Logic and debugging', level: '86%' }
];

const defaultBlogs = [
  { id: 1, title: 'Why Responsive Design Matters', category: 'Web Development', description: 'How responsive layouts improve user experience.' },
  { id: 2, title: 'Understanding LocalStorage', category: 'JavaScript', description: 'How browser LocalStorage can persist application data.' },
  { id: 3, title: 'Grid vs Flexbox', category: 'CSS', description: 'When to use Grid and Flexbox in web development.' }
];

const defaultCertificates = [
  { id: 1, title: 'Python Developer', image: '/images/python-developer.png', description: 'Course certificate.' },
  { id: 2, title: 'Introduction to Python', image: '/images/intro-python.png', description: 'Course certificate.' },
  { id: 3, title: 'Smart India Hackathon 2025', image: '/images/sih-2025-demo.png', description: 'Project concept showcase.' }
];

function getSaved(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) && value.length ? value : fallback;
  } catch {
    return fallback;
  }
}

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  const isAdmin = user?.role === 'admin';

  const [section, setSection] = useState('Overview');
  const [projects, setProjects] = useState(() => getSaved('projects', defaultProjects));
  const [skills, setSkills] = useState(() => getSaved('skills', defaultSkills));
  const [blogs, setBlogs] = useState(() => getSaved('blogs', defaultBlogs));
  const [certificates, setCertificates] = useState(() => getSaved('certificates', defaultCertificates));
  const [users, setUsers] = useState(() => getSaved('users', []));
  const [activity, setActivity] = useState(() => getSaved('activity', []));
  const [form, setForm] = useState({ title: '', category: 'Web', description: '', tech: '' });
  const [skillForm, setSkillForm] = useState({ name: '', description: '', level: '80%' });
  const [profileName, setProfileName] = useState(user?.name || '');

  useEffect(() => localStorage.setItem('projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('skills', JSON.stringify(skills)), [skills]);
  useEffect(() => localStorage.setItem('blogs', JSON.stringify(blogs)), [blogs]);
  useEffect(() => localStorage.setItem('certificates', JSON.stringify(certificates)), [certificates]);
  useEffect(() => localStorage.setItem('users', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('activity', JSON.stringify(activity)), [activity]);

  const record = (message) => {
    setActivity(old => [{ id: Date.now(), message, date: new Date().toLocaleString() }, ...old].slice(0, 20));
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const addProject = (e) => {
    e.preventDefault();
    const item = { id: Date.now(), ...form };
    setProjects(old => [...old, item]);
    record(`Added project: ${form.title}`);
    setForm({ title: '', category: 'Web', description: '', tech: '' });
  };

  const deleteProject = (id) => {
    setProjects(old => old.filter(item => item.id !== id));
    record('Deleted a project');
  };

  const addSkill = (e) => {
    e.preventDefault();
    setSkills(old => [...old, { id: Date.now(), ...skillForm }]);
    record(`Added skill: ${skillForm.name}`);
    setSkillForm({ name: '', description: '', level: '80%' });
  };

  const deleteSkill = (id) => {
    setSkills(old => old.filter(item => item.id !== id));
    record('Deleted a skill');
  };

  const addBlog = (e) => {
    e.preventDefault();
    setBlogs(old => [...old, { id: Date.now(), ...form }]);
    record(`Added blog: ${form.title}`);
    setForm({ title: '', category: 'Web', description: '', tech: '' });
  };

  const deleteBlog = (id) => {
    setBlogs(old => old.filter(item => item.id !== id));
    record('Deleted a blog');
  };

  const addCertificate = (e) => {
    e.preventDefault();
    setCertificates(old => [...old, { id: Date.now(), title: form.title, image: form.tech, description: form.description }]);
    record(`Added certificate: ${form.title}`);
    setForm({ title: '', category: 'Web', description: '', tech: '' });
  };

  const deleteCertificate = (id) => {
    setCertificates(old => old.filter(item => item.id !== id));
    record('Deleted a certificate');
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name: profileName };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    const updatedUsers = users.map(item => item.email === user.email ? updatedUser : item);
    setUsers(updatedUsers);
    record('Updated profile');
    alert('Profile updated successfully!');
  };

  const deleteUser = (email) => {
    if (email === user.email) {
      alert('You cannot delete your own logged-in account.');
      return;
    }
    if (!window.confirm('Delete this user account?')) return;
    setUsers(old => old.filter(item => item.email !== email));
    record(`Removed user: ${email}`);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const navItems = ['Overview', 'Projects', 'Skills', 'Certificates', 'Blogs', 'My Profile', 'Activity'];
  if (isAdmin) navItems.push('Manage Users');

  const removeButton = (onClick) => (
    <button className="danger-btn" type="button" onClick={onClick}>Delete</button>
  );

  return (
    <div className="dash">
      <aside>
        <h2>Portfolio Panel</h2>
        <p>PERSONAL MANAGEMENT</p>
        <nav>
          {navItems.map(item => (
            <button key={item} className={section === item ? 'active' : ''} onClick={() => setSection(item)}>
              {item}
            </button>
          ))}
        </nav>
        <button className="dashboard-logout" onClick={logout}>Logout</button>
      </aside>

      <main className="dashmain">
        <header className="dashhead">
          <div>
            <h1>Welcome, {user.name || 'User'}!</h1>
            <p>{isAdmin ? 'Administrator Dashboard' : 'Your personal portfolio dashboard'}</p>
          </div>
          <span>{isAdmin ? 'ADMIN' : 'USER'}</span>
        </header>

        {section === 'Overview' && (
          <>
            <section className="statgrid">
              {[
                ['Total Projects', projects.length],
                ['Total Skills', skills.length],
                ['Certificates', certificates.length],
                ['Blog Articles', blogs.length],
                ...(isAdmin ? [['Total Users', users.length]] : [])
              ].map(([label, value]) => (
                <div className="panel" key={label}><h3>{label}</h3><h2>{value}</h2></div>
              ))}
            </section>
            <section className="panel">
              <h2>Welcome to your dashboard</h2>
              <p>Use the sidebar to manage your portfolio information.</p>
              <h3>Recent Activity</h3>
              {activity.slice(0, 5).map(item => <p key={item.id}>{item.message} — {item.date}</p>)}
              {!activity.length && <p>No recent activity yet.</p>}
            </section>
          </>
        )}

        {section === 'Projects' && (
          <section className="panel manage">
            <h2>Manage Projects</h2>
            <form className="dashboard-form" onSubmit={addProject}>
              <input placeholder="Project title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option>Web</option><option>JavaScript</option><option>React</option><option>Other</option>
              </select>
              <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
              <input placeholder="Technologies" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} required />
              <button type="submit">Add Project</button>
            </form>
            {projects.map(item => <div className="item" key={item.id}><div><h3>{item.title}</h3><p>{item.description}</p><small>{item.category} · {item.tech}</small></div>{removeButton(() => deleteProject(item.id))}</div>)}
          </section>
        )}

        {section === 'Skills' && (
          <section className="panel manage">
            <h2>Manage Skills</h2>
            <form className="dashboard-form" onSubmit={addSkill}>
              <input placeholder="Skill name" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} required />
              <input placeholder="Description" value={skillForm.description} onChange={e => setSkillForm({ ...skillForm, description: e.target.value })} required />
              <select value={skillForm.level} onChange={e => setSkillForm({ ...skillForm, level: e.target.value })}>
                <option>60%</option><option>70%</option><option>80%</option><option>90%</option><option>100%</option>
              </select>
              <button type="submit">Add Skill</button>
            </form>
            {skills.map(item => <div className="item" key={item.id}><div><h3>{item.name} — {item.level}</h3><p>{item.description}</p></div>{removeButton(() => deleteSkill(item.id))}</div>)}
          </section>
        )}

        {section === 'Certificates' && (
          <section className="panel manage">
            <h2>Manage Certificates</h2>
            <form className="dashboard-form" onSubmit={addCertificate}>
              <input placeholder="Certificate title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <input placeholder="Image path or URL" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} required />
              <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
              <button type="submit">Add Certificate</button>
            </form>
            {certificates.map(item => <div className="item" key={item.id}><div><h3>{item.title}</h3><p>{item.description}</p><a href={item.image} target="_blank" rel="noreferrer">View certificate</a></div>{removeButton(() => deleteCertificate(item.id))}</div>)}
          </section>
        )}

        {section === 'Blogs' && (
          <section className="panel manage">
            <h2>Manage Blogs</h2>
            <form className="dashboard-form" onSubmit={addBlog}>
              <input placeholder="Blog title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
              <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
              <button type="submit">Add Blog</button>
            </form>
            {blogs.map(item => <div className="item" key={item.id}><div><h3>{item.title}</h3><p>{item.description}</p><small>{item.category}</small></div>{removeButton(() => deleteBlog(item.id))}</div>)}
          </section>
        )}

        {section === 'My Profile' && (
          <section className="panel profile">
            <h2>My Profile</h2>
            <form className="dashboard-form" onSubmit={saveProfile}>
              <label>Full Name<input value={profileName} onChange={e => setProfileName(e.target.value)} required /></label>
              <label>Email<input value={user.email} readOnly /></label>
              <label>Account Role<input value={user.role || 'user'} readOnly /></label>
              <button type="submit">Save Profile</button>
            </form>
          </section>
        )}

        {section === 'Activity' && (
          <section className="panel">
            <h2>Recent Activity</h2>
            {activity.map(item => <div className="item" key={item.id}><div><p>{item.message}</p><small>{item.date}</small></div></div>)}
            {!activity.length && <p>No activity recorded yet.</p>}
          </section>
        )}

        {section === 'Manage Users' && isAdmin && (
          <section className="panel manage">
            <h2>User Management</h2>
            {users.map(item => (
              <div className="item" key={item.email}>
                <div><h3>{item.name || 'Unnamed User'}</h3><p>{item.email}</p><small>Role: {item.role || 'user'}</small></div>
                {removeButton(() => deleteUser(item.email))}
              </div>
            ))}
            {!users.length && <p>No registered users found.</p>}
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;