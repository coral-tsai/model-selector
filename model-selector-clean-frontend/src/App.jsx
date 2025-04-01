import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home"; // 滑圖卡主畫面

export default function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      {userId ? <Home userId={userId} /> : <Login onLogin={setUserId} />}
    </div>
  );
}
