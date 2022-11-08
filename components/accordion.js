import { useState } from "react";
import AccordionSection from "./accordionSection";

const Accordion = () => {
    const [index, setIndex] = useState(false);

    const data = [
        {
            id: 1,
            img_path: "./images/AnnaM.JPG",
            author: "Anna Manfredsson",
            text: "I’ve used CD Keys for GTA Shark cards, fifa 23 and now the new MW2. Never had a single issue. Always cheaper than Amazon/Xbox or PSN marketplace. MW2 is £70 on ..."
        },
        {
            id: 2,
            img_path: "./images/AsaV.jfif",
            author: "Åsa Vikström",
            text: "Their products are of nice quality. I have ordered double Ottoman bed and really happy with it. I have also ordered Kensington Cashmere 1000 Pocket Sprung Luxu..."
        },
        {
            id: 3,
            img_path: "./images/BjornB.jfif",
            author: "Björn Bergholm",
            text: "It was the best experience of my life with such a hard-working, diligent, and helpful team of professionals. The MechESol Team knows how to get the best possibl..."
        },


    ];

    return (
        <div className="flex flex-col  items-center rounded-md py-2 h-auto ">
           {data.map((data)=>{
            return(
                <AccordionSection
                key={data.id}
                img_path={data.img_path}
                id={data.id}
                author={data.author}
                children={data.text}
                index={index}
                setIndex={setIndex}>

                </AccordionSection>
            );
           })}
        </div>
    );
}

export default Accordion;