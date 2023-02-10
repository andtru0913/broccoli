import HB_ITEMS from "./handbookItems";

const navHandbook = ({ language, currentPage }) => {
  return language === "english" ? (
    <div className={"grid grid-flow-row mt-1"}>
      <ul>
        {HB_ITEMS.map((item, i) => (
          <li key={i}
            className={`border-l-2 p-2 hover:border-l-3 hover:border-gray-400 ${
              currentPage === item.filename ? "font-medium" : ""
            }`}
          >
            <a key={i} href={item.filename}>
              {item.englishtitle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={"grid grid-flow-col  mt-1"}>
      <ul>
        {HB_ITEMS.map((item, i) => (
          <li key={i}
            className={`border-l-2 p-2 hover:border-l-3 hover:border-gray-400 ${
              currentPage === item.filename ? "font-medium" : ""
            }`}
          >
            <a key={i} href={item.filename}>
              {item.swedishtitle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default navHandbook;
