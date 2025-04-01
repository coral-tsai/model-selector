import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/login", {
        username,
        password,
      });
      if (res.data.success) {
        setMessage("✅ 登入成功");
      }
    } catch (err) {
      setMessage("❌ 登入失敗");
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl w-[300px]">
      <h2 className="text-xl font-bold mb-4">登入</h2>
      <input
        type="text"
        placeholder="使用者名稱"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-2 py-1 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-2 py-1 mb-4 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        登入
      </button>
      <p className="mt-4 text-center">{message}</p>
    </div>
  );
}

if (res.data.success) {
  setMessage("✅ 登入成功");
  setLoggedInUser(username); // 這個 state 傳到 App
}
