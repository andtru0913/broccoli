import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const data = [
  {
    year: "1993",
    text:
      "Broccoli grundades av Björn Bergholm vid sidan om Chalmersstudierna. " +
      "Genom åren har företaget vuxit och är numera ett väl utvecklat " +
      "teknikkonsultbolag  specialiserat inom elektronikutveckling.",
  },
  {
    year: "2003",
    text:
      "Broccoli blir heltidssyselsättning  " +
      "utvecklat teknikkonsultbolag specialiserat inom elektronikutveckling.",
  },
  {
    year: "2005",
    text: "Start av aktiebolaget Broccoli och anställning av första kollegan Henrik",
  },
  {
    year: "2006",
    text: "Vi tar in vår första examensarbetare",
  },
  {
    year: "2007",
    text: "Lågkonjunktur utan uppsägningar",
  },
  {
    year: "2010",
    text: "Broccoli blev ett Gasellföretag",
  },
  {
    year: "2012",
    text: "Första konsultchefen anställs",
  },
  {
    year: "2013",
    text: "Dotterbolaget Broccoli Systems startas",
  },
  {
    year: "2015",
    text: "Vi blir totalt 50 anställda i alla bolag",
  },
  {
    year: "2018",
    text: "Dotterbolaget Sectyne startas",
  },
  {
    year: "2019",
    text: "Broccoli Systems säljs",
  },
  {
    year: "2020",
    text:
      "Broccoligården köps in" +
      " konstruktion och testning av inbyggda system. Vi hjälper till att " +
      "täcka behov i gränslandet mellan hårdvara och mjukvara i flera olika branscher.",
  },
];

const TimelineComponent = () => {
  // noinspection JSValidateTypes
  return (
    <>
      <div className="hidden md:block py-12 lg:16 ">
        <h2 className="text-center uppercase font-bold">Historia</h2>
        <h5 className="text-center m-4 md:mb-8 ">
          Några milstolpar i Broccolis historia
        </h5>
        <Timeline className="items-center" position="alternate">
          {data.map((item, i) => (
            <TimelineItem key={i}>
              <TimelineSeparator className={"mx-5"}>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className=" ">
                  <h4 lassName="font-extrabold">{item.year}</h4>
                  <p className="max-w-readable ">{item.text}</p>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div
        className={
          " md:hidden layout text-skin-inverted text-center py-12  flex flex-col  flex-1  items-center justify-center lg:gap-20 gap-8"
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
