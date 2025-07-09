import { useEffect, useState } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import Header from "../components/Header";

export default function Home({ userId, onLogout }) {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/photos?userId=${userId}`
      );
      setPhotos(res.data);
    };
    fetchPhotos();
  }, [userId]);

  const handleSwipe = async (photoId, direction) => {
    await axios.post("http://localhost:5001/api/swipes", {
      userId,
      photoId,
      direction,
    });
    setIndex((prev) => prev + 1);
  };

  const current = photos[index];
  const remainingPhotos = photos.length - index;

  return (
    <div className="h-screen flex flex-col">
      <Header onLogout={onLogout} />
      <div className="flex-1 flex items-center justify-center text-center">
      
      {/* 進度條 */}
      {remainingPhotos > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">還有 {remainingPhotos} 張</span>
          </div>
        </div>
      )}
      
      {current ? (
        <div className="relative w-80 h-[28rem]">
          <TinderCard
            key={current._id}
            onSwipe={(dir) => handleSwipe(current._id, dir)}
            preventSwipe={["up", "down"]}
          >
            <img
              src={current.url}
              alt="model"
              className="w-80 h-96 object-cover rounded-xl shadow"
            />
          </TinderCard>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handleSwipe(current._id, "left")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              不喜歡
            </button>
            <button
              onClick={() => handleSwipe(current._id, "right")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              喜歡
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xl mt-10">🎉 已經沒有圖片了！</p>
      )}
      </div>
    </div>
  );
}
