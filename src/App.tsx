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
    <div className="bg-primary-bg h-screen flex flex-col items-center relative px-2">
      <h1 className="mb-4 text-white-black text-2xl md:mt-10 mt-5">TODO LIST</h1>
      <div className="flex gap-4 w-full max-w-[750px]">
        <InputSearch />
        <Select list={["lol", "lol", "lol", "lol"]} thumb="all" />
        <ChangeTheme
          theme={darkMode}
          onClick={() => setDarkMode((prev) => !prev)}
        />
      </div>
      <AddTask onClick={() => console.log("clicked")} className={"absolute bottom-8 right-[10vw]"}/>
    </div>
  );
}

export default App;
