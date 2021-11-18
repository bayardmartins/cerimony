import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Rating from "./pages/Rating";
import Schedules from "./pages/Schedules";
import Scheduling from "./pages/Scheduling";

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/scheduling/:id" element={<Scheduling />} />
        <Route path="/rating" element={<Rating />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
