import * as React from "react";
import {
  GrFlagFill,
  GrDocumentTime,
  GrOptimize,
  GrUserManager,
  GrGroup,
} from "react-icons/gr";
import {
  GiMaterialsScience,
  GiDeer,
  GiFamilyHouse,
  GiOrganigram,
} from "react-icons/gi";
import { MdOutlinePriceChange, MdStarOutline } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const data = [
  {
    icon: <GrFlagFill className="m-2 fill-tertiary-1" size={25} />,
    year: "1993",
    text: "Broccoli grundas av Björn som ett deltidsföretag vid sidan om Chalmersstudierna ",
  },
  {
    icon: <GrDocumentTime className="m-2 fill-tertiary-1" size={25} />,
    year: "2003",
    text: "Broccoli blir heltidssysselsättning med fokus på mjukvarubaserad utveckling ",
  },
  {
    icon: <GrOptimize className="m-2 fill-tertiary-1" size={25} />,
    year: "2005",
    text: "Broccoli byter bolagsform till aktiebolag och första kollegan Henrik anställs",
  },
  {
    icon: <GiMaterialsScience className="m-1  fill-tertiary-1" size={30} />,
    year: "2006",
    text: "Vi tar in vår första examensarbetare Dick",
  },
  {
    icon: <MdStarOutline className="m-1 fill-tertiary-1" size={30} />,
    year: "2007",
    text: "Lågkonjunktur men vi håller nollan, inga uppsägningar",
  },
  {
    icon: <GiDeer className="m-1  fill-tertiary-1" size={30} />,
    year: "2010",
    text: "Broccoli blir ett Gasellföretag ssvbvsfmkbnvz",
  },
  {
    icon: <GrUserManager className="m-2  fill-tertiary-1" size={25} />,
    year: "2012",
    text: "Första konsultchefen Jessica anställs",
  },
  {
    icon: <FaRegHandshake className="m-1 fill-tertiary-1" size={30} />,
    year: "2013",
    text: "Dotterbolaget Broccoli Systems startas",
  },
  {
    icon: <GrGroup className="m-2  fill-tertiary-1" size={25} />,
    year: "2015",
    text: "Vi passerar 50 anställda adjsvlzdmv DZSFBZDFB",
  },
  {
    icon: <FaRegHandshake className="m-1 fill-tertiary-1" size={30} />,
    year: "2018",
    text: "Dotterbolaget Sectyne startas DFBVZFVZD",
  },
  {
    icon: <MdOutlinePriceChange className="m-1  fill-tertiary-1" size={30} />,
    year: "2019",
    text: "Dotterbolaget Broccoli Systems med ca 25 anställda avyttras",
  },
  {
    icon: <GiFamilyHouse className="m-1  fill-tertiary-1" size={30} />,
    year: "2020",
    text: "Broccoligården köps slkndjdn DGBNSFXB",
  },
  {
    icon: <GiOrganigram className="m-1  fill-tertiary-1" size={30} />,
    year: "2021",
    text: "Styrningen och administrationen av företaget moderniseras",
    container: <div className="w-48 h-36 border-black border-2 " />,
  },
];

const callback = function (entries) {
  entries.forEach((entry) => {
    const animationType = entry.target.dataset.animateType;
    // Is the element in the viewport?
    if (entry.isIntersecting) {
      // Add the fadeIn class:
      entry.target.classList.add(animationType);
    } else {
      // Otherwise remove the fadein class
      entry.target.classList.remove(animationType);
    }
  });
};

const TimelineComponent = () => {
  // noinspection JSValidateTypes
  return (
    <>
      <div className="hidden md:block py-12">
        <h2 className="text-center uppercase font-bold">Historia</h2>
        <h5 className="text-center m-4 md:mb-8 ">
          Några milstolpar i Broccolis historia
        </h5>
        <Timeline className="items-center" position="alternate">
          {data.map((item, i) => (
            <TimelineItem key={i}>
              <TimelineSeparator className={"mx-6 flex justify-center"}>
                <TimelineDot variant="outlined" className="">
                  {item.icon}
                </TimelineDot>
                <TimelineConnector className="bg-black h-24 " />
              </TimelineSeparator>
              <TimelineContent>
                <div classname="flex flex-col justify-center w-full bg-slate-300 ">
                  <div className=" items-center border-2 border-secondary-d1 max-w-readable ">
                    <h4 className="font-extrabold my-4 px-3 motion-safe:animate-fadeIn">
                      {item.year}
                    </h4>
                    <h5 className="px-4 pb-4">{item.text}</h5>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        <div className="flex flex-col justify-center">
          <div className="  justify-center py-12">
            <h2 className="text-center uppercase font-bold">Nu</h2>
            <div className="w-screen flex justify-center">
              <h5 className=" max-w-readable text-center m-4 md:mb-8">
                Genom åren har företaget vuxit och är numera ett väl utvecklat
                teknikkonsultbolag specialiserat inom utveckling av
                mjukvarubaserade system och tjänster.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          " md:hidden layout text-skin-inverted text-center py-12  flex flex-col  flex-1  items-center justify-center  gap-8"
        }
      >
        {data.map((item, i) => (
          <div key={i} className=" w-full   flex flex-col items-center ">
            <div className="w-full flex-1 border-2  lg:p-4 p-4 flex flex-col items-center ">
              <h4 className="font-extrabold">{item.year}</h4>
              <p className=" ">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TimelineComponent;
