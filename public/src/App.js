import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./components/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
        <Route path="/" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
