import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Store from "./app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "./context/searchContext/searchContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
