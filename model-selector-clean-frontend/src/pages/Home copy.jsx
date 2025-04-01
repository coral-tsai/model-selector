import { useEffect, useRef, useState, createRef } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef([]);

  // 載入圖片資料
  useEffect(() => {
    axios.get("http://localhost:5003/photos").then((res) => {
      setPhotos(res.data);
      setCurrentIndex(0);
    });
  }, []);

  // 初始化 refs 陣列
  cardRefs.current = photos.map((_, i) => cardRefs.current[i] || createRef());

  // 儲存 swipe 喜好
  const handleSwipe = (dir, photo) => {
    const payload = {
      userId: "test-user",
      photoUrl: photo.url,
      direction: dir,
    };

    axios
      .post("http://localhost:5003/swipes", payload)
      .then(() => {
        console.log("✅ Swipe saved:", payload);
      })
      .catch((err) => {
        console.error("❌ Failed to save swipe:", err);
      });
  };

  // 按鈕觸發滑動
  const swipe = (dir) => {
    if (currentIndex < photos.length) {
      const card = cardRefs.current[currentIndex];
      if (card?.current) {
        card.current.swipe(dir); // 會觸發 TinderCard 的 onSwipe
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="relative w-[300px] h-[400px]">
        {photos.map((photo, index) => (
          <TinderCard
            ref={cardRefs.current[index]}
            key={photo._id}
            onSwipe={(dir) => handleSwipe(dir, photo)}
            onCardLeftScreen={() => setCurrentIndex((prev) => prev + 1)}
            preventSwipe={["up", "down"]}
          >
            <PhotoCard photo={photo} />
          </TinderCard>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => swipe("left")}
          className="px-5 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
        >
          👎 不喜歡
        </button>
        <button
          onClick={() => swipe("right")}
          className="px-5 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
        >
          👍 喜歡
        </button>
      </div>
    </div>
  );
}
