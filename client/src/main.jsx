import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { App } from "./App.jsx";
import { Client } from "./pages/client/Client.jsx";
import { Home } from "./pages/client/Home.jsx";
import { Orders } from "./pages/client/Orders.jsx";
import { Pay } from "./pages/client/Pay.jsx";
import { AboutApp } from "./pages/client/AboutApp.jsx";
import { NewOrder } from "./pages/client/NewOrder.jsx";
import { StartSession } from "./pages/client/StartSession.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<StartSession />}></Route>
          <Route path="client" element={<Client />}>
            <Route index element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="new-order" element={<NewOrder />}></Route>
            <Route path="pay" element={<Pay />}></Route>
            <Route path="about-app" element={<AboutApp />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
