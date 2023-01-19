import { useState } from "react";
import ReviewsSection from "./reviewsSection";

const Reviews = () => {
  const [index, setIndex] = useState(false);
  const data = [
    {
      id: 1,
      img_path: "/images/mthersthol.JPG",
      author: "Marcus Thersthol",
      text: "Här finns goda utvecklings- och karriärmöjligheter! Ledningen ser till mig som individ. Broccoli har korta beslutsvägar och högt i tak.",
    },
    {
      id: 2,
      img_path: "/images/anygren.jpg",
      author: "Åsa Nygren",
      text: "Jag har varit anställd på Broccoli i drygt 6 år och trivs väldigt bra. Jag upplever att alla här ges möjligheter att utvecklas och där det till stor del är ens egna intressen och önskemål som styr, vilket är viktigt för mig. På Broccoli känns alla kollegor intresserade och engagerade och jag har alltid tyckt att mina tankar och idéer blir hörda.",
    },
    {
      id: 3,
      img_path: "/images/BjornB.jfif",
      author: "Björn Bergholm",
      text: "It's a great company to learn whatever your field is in, with a hospitable and nurturing work environment. However, the turnover rate for employees is quite high.",
    },
  ];

  return (
    <div className=" h-auto transition-all duration-500">
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
