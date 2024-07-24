import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import { UserProvider } from "./Kanbas/UserContext";

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <div className="h-100">
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </div>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
