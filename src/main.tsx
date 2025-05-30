import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./kit/styles/global.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
