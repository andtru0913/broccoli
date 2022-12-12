import NewsSection from "./newsSection";

const Nyheter = ({data, admin}) => {
  return (
    <>
      {data.map((data) => {
        return (
          <NewsSection
              admin={admin}
            key={data.id}
            id={data.id}
            author={data.author}
            date={data.date}
            file={data.file}
            title={data.title}
          />
        );
      })}
    </>
  );
};

export default Nyheter;
