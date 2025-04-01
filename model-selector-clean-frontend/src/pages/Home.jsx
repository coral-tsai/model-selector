import React, { useEffect, useState, useRef, createRef } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const childRefs = useRef([]);
  const userId = "test-user";

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5003/photos")
  //     .then((res) => {
  //       const data = res.data;
  //       setPhotos(data);
  //       setCurrentIndex(data.length - 1);

  //       // 初始化 ref 陣列（只建立一次）
  //       data.forEach((_, i) => {
  //         if (!childRefs.current[i]) {
  //           childRefs.current[i] = createRef();
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("🚨 Failed to load photos:", err);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5001/photos")
      .then((res) => {
        const data = res.data;
        setPhotos(data);
        setCurrentIndex(data.length - 1);

        // 🟢 這裡是重點
        childRefs.current = data.map(() => createRef());
      })
      .catch((err) => {
        console.error("🚨 Failed to load photos:", err);
      });
  }, []);

  const handleSwipe = (dir, photo) => {
    console.log("📤 Sending swipe:", {
      userId,
      photoUrl: photo.url,
      direction: dir,
    });

    axios
      .post("http://localhost:5001/swipes", {
        userId: userId,
        photoUrl: photo.url,
        direction: dir,
      })
      .then(() => console.log("✅ Swipe saved"))
      .catch((err) => console.error("❌ Failed to save swipe:", err));
  };

  const swipe = async (dir) => {
    if (currentIndex < 0 || !childRefs.current[currentIndex]) return;
    await childRefs.current[currentIndex].current.swipe(dir);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <div className="relative w-[300px] h-[400px]">
        {photos.map((photo, index) => (
          <TinderCard
            key={photo._id}
            ref={childRefs.current[index]}
            onSwipe={(dir) => handleSwipe(dir, photo)}
            onCardLeftScreen={() => setCurrentIndex((prev) => prev - 1)}
            preventSwipe={["up", "down"]}
          >
            <PhotoCard photo={photo} />
          </TinderCard>
        ))}
        <div className="h-full rounded-2xl text-center text-lg text-gray-500 bg-gray-300 ">
          🖼️ 已經沒有圖片了！
        </div>
        {/* <div className="mt-6 flex justify-center">
          <img
            src="/no-more-images.png"
            alt="已經沒有圖片了"
            className="w-48 h-48 object-contain"
          />
        </div> */}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition"
          onClick={() => swipe("left")}
        >
          👎
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition"
          onClick={() => swipe("right")}
        >
          👍
        </button>
      </div>
    </div>
  );
}

// export default function Home({ userId }) {
//   return (
//     <div className="text-center mt-10">
//       <h2 className="text-2xl font-bold">🎉 登入成功！</h2>
//       <p className="mt-4">目前登入的使用者 ID 是：</p>
//       <code className="text-green-600">{userId}</code>
//     </div>
//   );
// }
