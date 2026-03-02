import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiPlus, FiEdit2, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import '../styles/pages/dashboard.css';

export default function Dashboard() {
  const { user, logout, isDeveloper, isClient } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [projectsRes, tasksRes, conversationsRes] = await Promise.all([
        api.listProjects().catch(() => ({ data: [] })),
        api.getAssignedTasks().catch(() => ({ data: [] })),
        api.getConversations().catch(() => ({ data: [] })),
      ]);

      setProjects(projectsRes.data || projectsRes || []);
      setTasks(tasksRes.data || tasksRes || []);
      setConversations(conversationsRes.data || conversationsRes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">DevHub</div>
          <nav className="dashboard-nav">
            <button onClick={() => navigate('/dashboard')} className="nav-link active">
              Dashboard
            </button>
            {isDeveloper && (
              <>
                <button onClick={() => navigate('/developer/projects')} className="nav-link">
                  Projects
                </button>
                <button onClick={() => navigate('/developer/hires')} className="nav-link">
                  Hires
                </button>
              </>
            )}
            {isClient && (
              <>
                <button onClick={() => navigate('/client/projects')} className="nav-link">
                  My Projects
                </button>
                <button onClick={() => navigate('/client/browse')} className="nav-link">
                  Find Developers
                </button>
                <button onClick={() => navigate('/client/hires')} className="nav-link">
                  Hires
                </button>
              </>
            )}
            <button onClick={() => navigate('/messages')} className="nav-link">
              Messages
            </button>
          </nav>
          <div className="header-actions">
            <button className="profile-btn" onClick={() => navigate('/profile')}>
              {user?.email}
            </button>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <FiLogOut size={20} />
            </button>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-nav">
            <button onClick={() => navigate('/profile')}>Profile</button>
            {isDeveloper && (
              <>
                <button onClick={() => navigate('/developer/projects')}>Projects</button>
                <button onClick={() => navigate('/developer/hires')}>Hires</button>
              </>
            )}
            {isClient && (
              <>
                <button onClick={() => navigate('/client/projects')}>My Projects</button>
                <button onClick={() => navigate('/client/browse')}>Find Developers</button>
                <button onClick={() => navigate('/client/hires')}>Hires</button>
              </>
            )}
            <button onClick={() => navigate('/messages')}>Messages</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Welcome Section */}
          <section className="welcome-section card">
            <h1>Welcome back, {user?.email?.split('@')[0]}! 👋</h1>
            <p>Your DevHub account is ready to go</p>
            {isDeveloper && (
              <>
                <p className="role-badge">👨‍💻 Developer</p>
                <div className="action-buttons">
                  <button
                    onClick={() => navigate('/profile')}
                    className="btn btn-primary"
                  >
                    <FiEdit2 size={18} /> Complete Your Profile
                  </button>
                  <button
                    onClick={() => navigate('/client/browse')}
                    className="btn btn-secondary"
                  >
                    Browse Projects
                  </button>
                </div>
              </>
            )}
            {isClient && (
              <>
                <p className="role-badge">🎯 Client</p>
                <div className="action-buttons">
                  <button
                    onClick={() => navigate('/client/projects/new')}
                    className="btn btn-primary"
                  >
                    <FiPlus size={18} /> Create Project
                  </button>
                  <button
                    onClick={() => navigate('/client/browse')}
                    className="btn btn-secondary"
                  >
                    Find Developers
                  </button>
                </div>
              </>
            )}
          </section>

          {/* Projects Widget */}
          <section className="projects-widget card">
            <div className="widget-header">
              <h2>Recent Projects</h2>
              <button onClick={() => navigate(isDeveloper ? '/developer/projects' : '/client/projects')}>
                View All
              </button>
            </div>
            {projects.length > 0 ? (
              <div className="projects-list">
                {projects.slice(0, 3).map(project => (
                  <div key={project._id} className="project-item">
                    <h3>{project.title}</h3>
                    <p className="status-badge">{project.status}</p>
                    <p className="description">{project.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">
                {isDeveloper ? 'No projects yet. Browse available projects.' : 'No projects created yet.'}
              </p>
            )}
          </section>

          {/* Tasks Widget */}
          {isDeveloper && (
            <section className="tasks-widget card">
              <div className="widget-header">
                <h2>Assigned Tasks</h2>
                <button onClick={() => navigate('/developer/tasks')}>View All</button>
              </div>
              {tasks.length > 0 ? (
                <div className="tasks-list">
                  {tasks.slice(0, 3).map(task => (
                    <div key={task._id} className="task-item">
                      <div className="task-status" data-status={task.status}></div>
                      <div className="task-info">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No assigned tasks</p>
              )}
            </section>
          )}

          {/* Messages Widget */}
          <section className="messages-widget card">
            <div className="widget-header">
              <h2>Recent Conversations</h2>
              <button onClick={() => navigate('/messages')}>View All</button>
            </div>
            {conversations.length > 0 ? (
              <div className="conversations-list">
                {conversations.slice(0, 3).map(conv => (
                  <div key={conv._id} className="conversation-item">
                    <h3>{conv.participantName}</h3>
                    <p className="preview">{conv.lastMessage}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No conversations yet</p>
            )}
          </section>

          {/* Quick Stats */}
          <section className="stats-section card">
            <h2>Quick Stats</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{projects.length}</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{tasks.length}</div>
                <div className="stat-label">Tasks</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{conversations.length}</div>
                <div className="stat-label">Conversations</div>
              </div>
            </div>
          </section>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadDashboardData}>Retry</button>
          </div>
        )}
      </main>
    </div>
  );
}
