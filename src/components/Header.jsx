function Header({ setActiveTab, darkMode, setDarkMode }) {
    return (
      <header>
        <h1>Alistair Chambers</h1>
        <button onClick={() => setDarkMode(!darkMode)}>🌙</button>
        <nav>
          <ul>
            {["projects", "skills", "experience", "about", "contact", "verilog"].map((tab) => (
              <li key={tab}>
                <button onClick={() => setActiveTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;