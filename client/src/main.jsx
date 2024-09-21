// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DateProvider } from "./context/DateContext.jsx";
import { UserProvider } from "./context/UsersContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <DateProvider>
    <UserProvider>
      <ChakraProvider>
        <ToastContainer position="bottom-center" />
        <App />
      </ChakraProvider>
    </UserProvider>
  </DateProvider>
  // </StrictMode>,
);
