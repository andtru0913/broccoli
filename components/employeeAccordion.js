import { useState } from "react";
import EmployeeAccordionSection from "./employeeAccordionSection";

const EmployeeAccordion = ({ data }) => {
  const [index, setIndex] = useState(false);
  return (
    <div className="flex  -mx-4 md:-mx-12 w-screen justify-center">
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
  );
};

export default EmployeeAccordion;
