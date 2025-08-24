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
import { ClientBody } from "./pages/client/ClientBody.jsx";

import { Waiter } from "./pages/waiter/Waiter.jsx";
import { WaiterBody } from "./pages/waiter/WaiterBody.jsx";
import { WaiterHome } from "./pages/waiter/Home.jsx";
import { WaiterSessionsPage } from "./pages/waiter/WaiterSessionsPage.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="client" element={<Client />}>
            <Route index element={<StartSession />}></Route>
            <Route element={<ClientBody />}>
              <Route path="home" element={<Home />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="new-order" element={<NewOrder />}></Route>
              <Route path="pay" element={<Pay />}></Route>
              <Route path="about-app" element={<AboutApp />}></Route>
            </Route>
          </Route>

          <Route path="waiter" element={<Waiter />}>
            <Route element={<WaiterBody />}>
              <Route path="orders" element={<WaiterHome />}></Route>
              <Route path="sessions" element={<WaiterSessionsPage />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
