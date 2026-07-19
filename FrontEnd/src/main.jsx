// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryclient } from "./lib/queryClient.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryclient}>
          <App />
          <Toaster position="top-center" />
          <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  // </StrictMode>,
);
