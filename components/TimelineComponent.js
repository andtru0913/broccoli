import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const data = [
    {
        year: "1993",
        text: "Broccoli grundades av Björn Bergholm vid sidan om Chalmersstudierna. " +
            "Genom åren har företaget vuxit och är numera ett väl utvecklat teknikkonsultbolag " +
            "specialiserat inom elektronikutveckling."
    },
    {
        year: "2000",
        text: "Genom åren har företaget vuxit och är numera ett väl " +
            "utvecklat teknikkonsultbolag specialiserat inom elektronikutveckling."
    },
    {
        year: "2018",
        text: "Broccoli köper Broccoligården"
    },
    {
        year: "NUTID",
        text: "Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda tjänster inom design," +
            " konstruktion och testning av inbyggda system. Vi hjälper till att " +
            "täcka behov i gränslandet mellan hårdvara och mjukvara i flera olika branscher."
    },
]


const TimelineComponent = () => {
    // noinspection JSValidateTypes
    return (
        <>
            <div className={"hidden md:block"}>
                <h1 className={"text-center m-4"} >Historia</h1>
                <Timeline className={"items-center"} position="alternate">
                    {data.map((item, i) => (
                        <TimelineItem key={i}>
                            <TimelineSeparator className={"mx-5"}>
                                <TimelineDot />
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div className={""}>
                                    <h4>{item.year}</h4>
                                    <p>{item.text}</p>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    ))}

                </Timeline>
            </div>
            <div className={"block md:hidden layout text-skin-inverted text-center py-12  flex flex-col  flex-1  items-center justify-center   lg:gap-20 gap-8"}>
                {data.map((item, i) => (
                    <div key={i} className=" w-full   flex flex-col items-center ">
                        <div className="w-full flex-1 border-2  lg:p-4 p-4 flex flex-col items-center ">
                            <h4 className="font-bold">{item.year}</h4>
                            <p className="">
                                {item.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TimelineComponent