import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "/src/config";

export default function Home({ userId }) {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await axios.get(`${API_BASE}/photos?userId=${userId}`);
      setPhotos(res.data);
    };
    fetchPhotos();
  }, [userId]);

  const handleSwipe = async (photoId, direction) => {
    await axios.post(`${API_BASE}/swipes`, {
      userId,
      photoId,
      direction,
    });
    setIndex((prev) => prev + 1);
  };

  const current = photos[index];

  return (
    <div className="text-center">
      {current ? (
        <div className="p-4">
          <img
            src={current.url}
            alt="model"
            className="w-80 h-96 object-cover rounded-xl shadow"
          />
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
  );
}
