import { useState } from "react";
import ReviewsSection from "./reviewsSection";

const Reviews = () => {
  const [index, setIndex] = useState(false);
  const data = [
    {
      id: 1,
      img_path: "./images/AnnaM.JPG",
      author: "Anna Manfredsson",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },
    {
      id: 2,
      img_path: "./images/AsaV.jfif",
      author: "Åsa Vikström",
      text: "Excellent culture and great leadership team. Enjoy the offices and co-workers. Happy to be a part of such a great company. Feel very respected and heard by teams and leaders.",
    },
    {
      id: 3,
      img_path: "./images/BjornB.jfif",
      author: "Björn Bergholm",
      text: "It's a great company to learn whatever your field is in, with a hospitable and nurturing work environment. However, the turnover rate for employees is quite high.",
    },
  ];

  return (
    <div className=" py-2 h-auto transition-all duration-500">
      {data.map((data) => {
        return (
          <ReviewsSection
            key={data.id}
            img_path={data.img_path}
            id={data.id}
            author={data.author}
            children={data.text}
            index={index}
            setIndex={setIndex}
          />
        );
      })}
    </div>
  );
};

export default Reviews;
