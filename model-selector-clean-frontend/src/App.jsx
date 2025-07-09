import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"; // 滑圖卡主畫面
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 檢查 localStorage 中是否有儲存的用戶ID
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">載入中...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="h-screen w-screen bg-gray-100">
        {userId ? (
          <Routes>
            <Route path="/" element={<Home userId={userId} onLogout={handleLogout} />} />
            <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <Login onLogin={setUserId} />
        )}
      </div>
    </Router>
  );
}
