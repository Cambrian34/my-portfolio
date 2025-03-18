import React from "react";

const Projects = ({ projects, setLanguageFilter, setSortOption }) => {
  const languages = ["All", ...new Set(projects.map((repo) => repo.language).filter(Boolean))];

  return (
    <div>
      <h2>Projects</h2>

      <div className="filters">
        <select onChange={(e) => setLanguageFilter(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="updated">Sort by Latest</option>
          <option value="name">Sort by Name</option>
          <option value="stars">Sort by Stars</option>
        </select>
      </div>

      <div id="projects-container">
        {projects.map((repo) => (
          <div key={repo.id} className="project-card">
            <h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h3>
            <p>{repo.description || "No description available."}</p>
            <p>
              ⭐ {repo.stargazers_count} | 🛠 {repo.language || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;