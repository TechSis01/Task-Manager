import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// REACT QUERY PROVIDER
// import { QueryClient,QueryClientProvider} from "@tanstack/react-query/build/legacy/index.js";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
// REDUX PROVIDER
import { Provider } from "react-redux";
import { store } from "./GlobalRedux/store";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
