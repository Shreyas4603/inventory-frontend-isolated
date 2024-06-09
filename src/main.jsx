import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { ThemeProvider } from "./theme-provider.jsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster richColors position="top-center" />
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
