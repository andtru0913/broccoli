import { useState } from "react";
import ReviewsSection from "./reviewsSection";

const Reviews = () => {
  const [index, setIndex] = useState(false);
  const data = [
    {
      id: 1,
      img_path: "/images/mthersthol1.jpg",
      author: "Marcus ",
      text: "Här finns goda utvecklings- och karriärmöjligheter! Ledningen ser till mig som individ. Broccoli har korta beslutsvägar och högt i tak.",
    },
    {
      id: 2,
      img_path: "/images/anygren.jpg",
      author: "Åsa ",
      text: "Jag har varit anställd på Broccoli i drygt 6 år och trivs väldigt bra. Jag upplever att alla här ges möjligheter att utvecklas och där det till stor del är ens egna intressen och önskemål som styr, vilket är viktigt för mig. På Broccoli känns alla kollegor intresserade och engagerade och jag har alltid tyckt att mina tankar och idéer blir hörda.",
    },
    {
      id: 3,
      img_path: "/images/klarsson.jpg",
      author: "Karin ",
      text:
        'Broccoli är ett företag där man som konsult inte "försvinner" i mängden samt att det har en platt organisation så det snabbt o lätt går att få tag på rätt person. \n' +
        "På Broccoli tar sig vårt härliga admingäng sig tid att lyssna på oss konsulter och ser till att vi mår bra på arbetsplatsen vi befinner oss på samt att vi vidareutvecklas. Jag är inte endast elektroingenjör utan även fyrbarnsmorsa och tycker att sommarfesterna som Broccoli anordnar är kanon för då får hela familjen följa med!",
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
            text={data.text}
            index={index}
            setIndex={setIndex}
          />
        );
      })}
    </div>
  );
};

export default Reviews;
