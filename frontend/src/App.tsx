import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import ListOfEmployees from "./components/ListOfEmployees";
import Edit from "./components/EditEmployee";
import CreateEmployee from "./components/CreateEmployee";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<ListOfEmployees />} />
          <Route path={"/employees/:id"} element={<Edit />} />
          <Route path="/new" element={<CreateEmployee />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
