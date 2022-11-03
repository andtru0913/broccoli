import { useState } from "react";
import AccordionSection from "./accordionSection";

const Accordion = () => {
    const [index, setIndex] = useState(false);

    const data = [
        {
            id: 1,
            img_path: "./images/AnnaM.JPG",
            author: "Anna Manfredsson",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: 2,
            img_path: "./images/AsaV.jfif",
            author: "Åsa Vikström",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: 3,
            img_path: "./images/BjornB.jfif",
            author: "Åsa Vikström",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },


    ];

    return (
        <div className="flex flex-col  items-center rounded-md p-2 h-auto ">
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