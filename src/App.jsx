import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Verilog from "./components/Verilog";

function App() {
  const [activeTab, setActiveTab] = useState("projects");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark-mode") === "true"
  );
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [languageFilter, setLanguageFilter] = useState("All");
  const [sortOption, setSortOption] = useState("updated");

  useEffect(() => {
    document.body.style.backgroundImage = darkMode
      ? "none"
      : "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')";
    document.body.style.backgroundSize = "cover";
    document.body.style.color = darkMode ? "black" : "white";
    localStorage.setItem("dark-mode", darkMode);

    // Fetch GitHub Projects
    async function fetchProjects() {
      const GITHUB_USERNAME = "Cambrian34";
      const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
      try {
        const response = await fetch(REPOS_URL);
        if (!response.ok) throw new Error("GitHub API error");
        const repos = await response.json();
        if (Array.isArray(repos)) {
          setProjects(repos);
          setFilteredProjects(repos);
        }
      } catch (error) {
        console.error("GitHub API Error:", error);
      }
    }
    fetchProjects();
  }, [darkMode]);

  // Handle project filtering and sorting
  useEffect(() => {
    let filtered = projects.filter((repo) =>
      languageFilter === "All" ? true : repo.language === languageFilter
    );

    filtered = filtered.sort((a, b) => {
      if (sortOption === "updated") return new Date(b.updated_at) - new Date(a.updated_at);
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "stars") return b.stargazers_count - a.stargazers_count;
      return 0;
    });

    setFilteredProjects(filtered);
  }, [projects, languageFilter, sortOption]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle Tab Switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <nav className="sidebar">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <ul>
          <li onClick={() => handleTabSwitch("projects")}>Projects</li>
          <li onClick={() => handleTabSwitch("skills")}>Skills</li>
          <li onClick={() => handleTabSwitch("experience")}>Experience</li>
          <li onClick={() => handleTabSwitch("about")}>About</li>
          <li onClick={() => handleTabSwitch("contact")}>Contact</li>
          <li onClick={() => handleTabSwitch("verilog")}>Verilog</li>
        </ul>
      </nav>

      <main className="content">
        {activeTab === "projects" && (
          <Projects
            projects={filteredProjects}
            setLanguageFilter={setLanguageFilter}
            setSortOption={setSortOption}
          />
        )}
        {activeTab === "skills" && <Skills />}
        {activeTab === "experience" && <Experience />}
        {activeTab === "about" && <About />}
        {activeTab === "contact" && <Contact />}
        {activeTab === "verilog" && <Verilog />}
      </main>
    </div>
  );
}

export default App;