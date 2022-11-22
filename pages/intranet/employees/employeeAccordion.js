import { useState } from "react";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import EmployeeAccordionSection from "./employeeAccordionSection";

const EmployeeAccordion = () => {
  const [index, setIndex] = useState(false);

  const data = [
    {
      id: 1,
      img_path: "/images/AnnaM.JPG",
      author: "Anna Manfredsson",
      roll: "Konsult",
      uppdrag: "Volov Cars",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },
    {
      id: 2,
      img_path: "/images/AsaV.jfif",
      author: "Åsa Vikström",
      roll: "Konsult",
      uppdrag: "Volov Cars",
      text: "Excellent culture and great leadership team. Enjoy the offices and co-workers. Happy to be a part of such a great company. Feel very respected and heard by teams and leaders.",
    },
    {
      id: 3,
      img_path: "/images/BjornB.jfif",
      author: "Björn Bergholm",
      roll:"Konsult",
      uppdrag: "Volov Cars",
      text: "It's a great company to learn whatever your field is in, with a hospitable and nurturing work environment. However, the turnover rate for employees is quite high.",
    },

    {
      id: 4,
      img_path: "/images/AnnaM.JPG",
      author: "Anna Manfredsson",
      roll:"Konsult",
      uppdrag: "Volov Cars",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },

    {
      id: 5,
      img_path: "/images/AnnaM.JPG",
      author: "Anna Manfredsson",
      roll:"Konsult",
      uppdrag: "Volov Cars",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },

  ];

  

  return (
    <div className="flex flex-row gap-1 flex-wrap justify-center">
      {data.map((data) => {
        return (
          <EmployeeAccordionSection
            key={data.id}
            img_path={data.img_path}
            id={data.id}
            author={data.author}
            children={data.text}
            roll={data.roll}
            uppdrag={data.uppdrag}
            index={index}
            setIndex={setIndex}
          ></EmployeeAccordionSection>
        );
        
      })}
      
    </div>
  );
};

export default EmployeeAccordion;
