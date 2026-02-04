import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Valentine from "./pages/Valentine";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/val/:id" element={<Valentine />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
