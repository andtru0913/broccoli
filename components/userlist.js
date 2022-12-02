import { useState } from "react";
import SmallProfile from "./smallProfile";
const List = ({ users }) => {
  const [index, setIndex] = useState(true);

  const showComing = () => {
    setIndex(true);
  };
  const showNotComing = () => {
    setIndex(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center mb-2">
        <button
          className={`flex justify-start w-full p-2 text-xs md:text-base ${
            index
              ? "text-primary-d1 bg-fill-2"
              : "text-color-base hover:bg-fill-2"
          }`}
          onClick={showComing}
        >
          Kommer
        </button>
        <button
          className={`flex justify-start w-full p-2 text-xs md:text-base ${
            index
              ? "text-color-base hover:bg-fill-2"
              : "text-primary-d1 bg-fill-2 "
          }`}
          onClick={showNotComing}
        >
          Kommer ej
        </button>
      </div>

      {index ? (
        <ol>
          {users
            .filter(function (u) {
              return u.coming;
            })
            .map((user) => (
              <li className="p-2 hover:bg-fill-2" key={user.user.firstname}>
                <SmallProfile
                  firstname={user.user.firstname}
                  lastname={user.user.lastname}
                  image={user.image}
                />
              </li>
            ))}
        </ol>
      ) : (
        <ol>
          {users
            .filter(function (u) {
              return !u.coming;
            })
            .map((user) => (
              <li className="p-2 hover:bg-fill-2" key={user.user.firstname}>
                <SmallProfile
                  firstname={user.user.firstname}
                  lastname={user.user.lastname}
                  image={user.image}
                />
              </li>
            ))}
        </ol>
      )}
    </div>
  );
};

export default List;

/**
 * 
 * 
 *  <div className=" rounded-md py-2 h-auto transition-all duration-500">
      {data.map((data) => {
        return (
          <UserlistSection
            key={data.id}
            users={users}
            id={data.id}
            index={index}
            setIndex={setIndex}
          ></UserlistSection>
        );
      })}
    </div>
 */
