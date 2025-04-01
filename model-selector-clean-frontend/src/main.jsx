// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);

// ===== model-selector-clean-frontend/src/App.jsx =====
import { useState } from "react";
import Login from "./Login";
import Home from "./Home"; // 假設 Home 是滑圖卡主畫面

export default function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      {userId ? <Home userId={userId} /> : <Login onLogin={setUserId} />}
    </div>
  );
}
