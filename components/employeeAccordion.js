import { useState } from "react";
import EmployeeAccordionSection from "./employeeAccordionSection";

const EmployeeAccordion = ({ data }) => {
  const [index, setIndex] = useState(false);
  return (
    <div className="w-screen layout -ml-8 md:-ml-28">
      <div className=" flex  md:-mr:12  justify-center">
        <div className=" flex flex-row  flex-wrap gap-4 justify-center">
          {data.map((user, uid) => {
            return (
              <EmployeeAccordionSection
                key={uid}
                img_path={user.image}
                id={uid}
                author={`${user.firstname} ${user.lastname}`}
                phone={user.worknumber}
                roll={user.role}
                uppdrag={user.assignment}
                index={index}
                setIndex={setIndex}
                email={user.email}
                text={user.description}
              ></EmployeeAccordionSection>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccordion;
