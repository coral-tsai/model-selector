import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home"; // 滑圖卡主畫面

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
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      {userId ? <Home userId={userId} onLogout={handleLogout} /> : <Login onLogin={setUserId} />}
    </div>
  );
}
