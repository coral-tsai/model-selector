import { useState } from "react";
import Login from "./Login";
import Home from "./Home";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      {user ? <Home user={user} /> : <Login setLoggedInUser={setUser} />}
    </div>
  );
}
