import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ClassList from "./components/ClassList";
import DetailClass from "./components/DetailClass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/classes" element={<ClassList />} />
        <Route path="/detail/:id" element={<DetailClass />} />
        <Route path="/" element={<Navigate to="/classes" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
