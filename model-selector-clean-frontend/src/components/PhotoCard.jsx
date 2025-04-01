// import TinderCard from "react-tinder-card";

// export default function PhotoCard({ photo }) {
//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[300px] h-[400px]">
//       <img src={photo.url} alt="photo" className="w-full h-full object-cover" />
//     </div>
//   );
// }

import TinderCard from "react-tinder-card";

export default function PhotoCard({ photo, onSwipe }) {
  return (
    <TinderCard
      className="absolute"
      key={photo.url}
      onSwipe={(dir) => onSwipe(dir, photo)}
      preventSwipe={["up", "down"]}
    >
      <div className="w-[300px] h-[400px] bg-white rounded-2xl flex flex-col items-center justify-center overflow-hidden">
        <img
          src={photo.url}
          alt="model"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 text-sm rounded-b-2xl">
          <p>Country: {photo.attributes.country}</p>
          <p>Age: {photo.attributes.age}</p>
          <p>Hair: {photo.attributes.hair_color}</p>
        </div>
      </div>
    </TinderCard>
  );
}
