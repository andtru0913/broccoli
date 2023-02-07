import SmallProfile from "../SmallProfile";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
  timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { BiNews } from "react-icons/bi";

const NewsSection = ({ id, title, author, date, file, admin, link }) => {
  return (
    <a
      key={id}
      href={`${link}${file}`}
      className=" cursor-pointer transition-all bg-secondary-l1/90 hover:bg-secondary-l2 mt-4 z-10 "
    >
      <div className="felx justify-between">
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0.01,
              padding: 0,
            },
          }}
          className="flex justify-start  border-b-2 border-dashed border-black"
          position="right"
        >
          <TimelineItem className="ml-1">
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                color="success"
                //className="w-5 h-5 md:mt-5 mt-2 "
              >
                <BiNews size={20} />
              </TimelineDot>
              <TimelineConnector className="bg-black w-1" />
            </TimelineSeparator>
            <TimelineContent>
              <div className=" flex flex-col m-2  ">
                <div className="flex flex-row justify-between ">
                  <div className=" flex flex-row">
                    <SmallProfile />
                    <p className="pl-1 md:pl-5 pt-2 italic">
                      {author.firstname}
                    </p>
                  </div>
                  <p className="p-2 rounded-sm bg-primary-1 font-semibold">
                    {date.split("T")[0]}
                  </p>
                </div>
                <div className="flex justify-end my-2 md:my-3 ">
                  {admin ? (
                    <div className={"flex"}>
                      <form
                        className={"flex flex-row "}
                        method={"POST"}
                        action={"../../api/admin/deleteNews"}
                      >
                        <input type={"hidden"} name={"id"} value={id} />
                        <input
                          type={"hidden"}
                          name={"redirect"}
                          value={"../../intranet/news"}
                        />
                        <button
                          className="flex justify-end  btn btn-delete"
                          type={"submit"}
                        >
                          Radera
                        </button>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={"flex justify-between"}>
                  <h4 className={"uppercase font-bold"}>{title}</h4>
                  {admin ? (
                    <form
                      className={"flex flex-row items-center"}
                      method={"POST"}
                      action={"../../api/admin/archiveNews"}
                    >
                      <input type={"hidden"} name={"id"} value={id} />
                      <input
                        type={"hidden"}
                        name={"redirect"}
                        value={"../../intranet/news"}
                      />
                      <button className=" btn btn-primary " type={"submit"}>
                        Arkivera
                      </button>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
      {/* <div className=" flex flex-1 z-10 ">
        <div className=" flex flex-col p-2 mt-3 ml-5 justify-center">
          <SmallProfile className="font-normal "></SmallProfile>
          <p className="py-2">{author.firstname}</p>
        </div>
        <div className="flex flex-col p-5 mt-5 w-full">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col p-2  mx-5 justify-center w-full z-10">
              <div className="flex flex-row ">
                <p className="">{date.split("T")[0]}</p>
                {admin ? (
                  <div className={"flex justify-between"}>
                    <form
                      className={"flex flex-row "}
                      method={"POST"}
                      action={"../../api/admin/deleteNews"}
                    >
                      <input type={"hidden"} name={"id"} value={id} />
                      <input
                        type={"hidden"}
                        name={"redirect"}
                        value={"../../intranet/news"}
                      />
                      <button className={"flex justify-end"} type={"submit"}>
                        Radera
                      </button>
                    </form>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={"flex justify-between"}>
                <h4 className={"uppercase font-bold"}>{title}</h4>
                {admin ? (
                  <form
                    className={"flex flex-row items-center"}
                    method={"POST"}
                    action={"../../api/admin/archiveNews"}
                  >
                    <input type={"hidden"} name={"id"} value={id} />
                    <input
                      type={"hidden"}
                      name={"redirect"}
                      value={"../../intranet/news"}
                    />
                    <button className={"mr-auto "} type={"submit"}>
                      Arkivera
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </a>
  );
};

export default NewsSection;
