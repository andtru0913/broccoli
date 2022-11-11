import NewsSection from "./newsSection";

const Nyheter = () => {
  const time = new Date();
  const data = [
    {
      id: 0,
      slug: "first_news",
      title: " Brev från björn",
      body: "massa information och kul",
      timestamp: time,
      img_path: "./images/BjornB.jfif",
    },
    {
      id: 1,
      slug: "second_news",
      title: " Brev från anna",
      body: "massa information och kul",
      timestamp: time,
      img_path: "./images/BjornB.jfif",
    },
  ];
  return (
    <>
      {data.map((data) => {
        return (
          <NewsSection
            id={data.id}
            slug={data.slug}
            title={data.title}
            body={data.body}
            timestamp={data.timestamp}
            img_path={data.img_path}
          />
        );
      })}
    </>
  );
};

export default Nyheter;
