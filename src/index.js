import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as ModalProvider } from "./Contexts/ModalContext/ModalContext";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
axios.defaults.baseURL = "http://localhost:9090";
// axios.defaults.baseURL = "https://goldfish-app-y4y9v.ondigitalocean.app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);