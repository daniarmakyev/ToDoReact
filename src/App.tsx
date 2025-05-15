import { useState, useEffect } from "react";
import InputSearch from "./kit/InputSearch";
import Select from "./kit/Select";
import ChangeTheme from "./kit/buttons/ChangeTheme";
import AddTask from "./kit/buttons/AddTask";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <div className="bg-primary-bg h-screen">
        <InputSearch />
        <Select list={["lol", "lol", "lol", "lol"]} thumb="all" />
        <ChangeTheme
          theme={darkMode}
          onClick={() => setDarkMode((prev) => !prev)}
        />
        <AddTask onClick={() => console.log("clicked")} />
      </div>
    </>
  );
}

export default App;
