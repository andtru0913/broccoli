import { useState } from "react";
import EmployeeAccordionSection from "./employeeAccordionSection";

const EmployeeAccordion = ({data}) => {
  const [index, setIndex] = useState(false);
  return (
    <div className="flex flex-row gap-1 flex-wrap justify-center">
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
  );
};

export default EmployeeAccordion;
