import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CombinedContextProvider } from "./context/CombinedContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CombinedContextProvider>
        <App />
      </CombinedContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);