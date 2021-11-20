import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import NotFound from "./pages/404"
import Login from "./pages/Login"
import Rating from "./pages/Rating"
import Schedules from "./pages/Schedules"
import Scheduling from "./pages/Scheduling"
import Configure from "./pages/Configure"

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/scheduling/:id" element={<Scheduling />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/configue" element={<Configure />} />
        <Route path="/404" element={<NotFound />} />
        <Route path='*' element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}
