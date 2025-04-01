import { useEffect, useState } from "react";
import axios from "axios";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [lastSwipe, setLastSwipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPhoto = photos[currentIndex];
  const cardRefs = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/photos") // ← 如果後端不是 5001 請改掉
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSwipe = (dir, photo) => {
    // setLastSwipe({ dir, url: photo.url });

    axios
      .post("http://localhost:5003/swipes", {
        userId: "test-user", // 暫時用一個假 ID
        photoUrl: photo.url,
        direction: dir,
      })
      .then(() => {
        console.log(`✅ Swipe saved: ${dir} on ${photo.url}`);
      })
      .catch((err) => {
        console.error("❌ Failed to save swipe:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-[300px] h-[400px]">
        {photos.map((photo) => (
          <PhotoCard key={photo.url} photo={photo} onSwipe={handleSwipe} />
        ))}
      </div>
      {lastSwipe && (
        <div className="mt-6 text-lg">
          You swiped <strong>{lastSwipe.dir}</strong> on <br />
          <span className="text-blue-500">{lastSwipe.url}</span>
        </div>
      )}

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => handleSwipe("left", photos[currentIndex])}
          className="px-5 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
        >
          👎 不喜歡
        </button>
        <button
          onClick={() => handleSwipe("right", photos[currentIndex])}
          className="px-5 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
        >
          👍 喜歡
        </button>
      </div>
    </div>
  );
}
