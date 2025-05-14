import { useState, useEffect } from "react";
import Search from "./kit/Search";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <>
      <div>
        <Search />
        <button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
    </>
  );
}

export default App;
