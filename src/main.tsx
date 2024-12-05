import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { StyleProvider } from "@ant-design/cssinjs";

import App from "./App.tsx";
import store from "./store.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleProvider layer>
      <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
    </StyleProvider>
  </StrictMode>
);
