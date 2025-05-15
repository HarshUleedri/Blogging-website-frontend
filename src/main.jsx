import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Store from "./app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchProvider from "./context/SearchContext/SearchProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
);
