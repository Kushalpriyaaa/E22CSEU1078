import React, { useState, useEffect } from "react";
import { getUsers } from "../services/Api";
import UserList from "./UserList";
import "./Dashboard.css";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.isActive).length,
    totalPosts: users.reduce((acc, user) => acc + (user.posts || 0), 0),
    engagement: "85%"
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <UserList users={users} />;
      case 'analytics':
        return <div>Analytics Content</div>;
      case 'posts':
        return <div>Posts Content</div>;
      default:
        return <UserList users={users} />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Social Media Analytics Dashboard</h1>
        <p>Get insights into user activity and engagement</p>
      </header>

      <nav className="dashboard-nav">
        {['overview', 'analytics', 'posts'].map(tab => (
          <div
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </nav>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{stats.totalPosts}</p>
        </div>
        <div className="stat-card">
          <h3>Engagement Rate</h3>
          <p>{stats.engagement}</p>
        </div>
      </div>

      <section className="dashboard-content">
        {renderContent()}
      </section>
    </div>
  );
}