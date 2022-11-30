import LayoutIntranet from "../../components/layout/layoutIntranet";

const nyhetsdata = [
  {
    id: "00",
    title: "Hej och välkommna",
    month: "Dec",
    date: "10",
  },
  {
    id: "01",
    title: "Detta händer på Broccoli",
    month: "Dec",
    date: "13",
  },

  {
    id: "02",
    title: "Detta händer hos oss",
    month: "Sep",
    date: "01",
  },

  {
    id: "03",
    title: "Detta händer just nu",
    month: "Aug",
    date: "23",
  },
];

export default function news({}) {
  return (
    <LayoutIntranet>
      <div className="bg-zinc-400 flex flex-col items-center justify-center p-5 ">
        <h1 className="p-4"> nyheter </h1>
        <p> Här hittar ni alla skojiga nyheter </p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row">
          <svg
            className=" absolute -z-10 left-0"
            width="1003"
            height="1107"
            viewBox="0 0 1003 1107"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-405.367 835.806C-432.001 969.232 -336.037 976.73 -164.842 1038.99C13.0588 1103.69 239.276 959.688 346.77 1063.25C426.95 1107.2 420.721 1116.42 531.945 1096.89C643.168 1077.36 653.92 966.549 697.087 950.223C751.045 929.816 845.167 877.613 916.799 816.125C988.432 754.637 1003.37 618.516 1002.11 445.824C1000.84 273.133 837.492 229.179 777.746 172.479C718 115.779 697.087 43.4356 588.505 13.9488C479.924 -15.5379 392.426 9.82456 306.692 43.4355C220.958 77.0465 137.307 65.9843 68.3682 115.779C-0.570077 165.574 1.53185 174.267 10.2654 278.899C18.999 383.53 -216.019 477.159 -316.121 573.137C-416.223 669.114 -378.734 702.379 -405.367 835.806Z"
              fill="#F9CCFA"
            />
          </svg>

          <svg
            className="absolute -z-10 right-0"
            width="916"
            height="992"
            viewBox="0 0 916 992"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1076.54 536.211C1129 481.733 1162.98 429.612 1135.21 385.366C1099.43 342.88 1079.11 221.986 942.188 139.86C883.571 93.1478 828.694 74.5988 711.915 24.6996C646.676 -3.177 560.298 65.1129 472.678 87.7451C385.057 110.377 271.808 -28.7223 177.414 6.41411C107.024 32.6159 50.5347 122.503 47.3241 151.469C42.9831 190.634 -3.8496 282.131 1.1307 358.169C7.03954 448.382 82.996 541.715 147.869 590.956C195.895 627.41 262.594 635.375 353.42 634.654C472.035 633.712 505.984 774.547 553.94 837.605L553.961 837.633C601.924 900.698 694.494 1022.42 790.991 984.215C838.403 965.444 902.668 944.06 919.412 858.449C932.492 791.569 1029.89 759.386 1048.75 705.878C1067.61 652.369 1024.09 590.689 1076.54 536.211Z"
              fill="#F5F1E2"
            />
          </svg>

          <div className="grid grid-cols-3 w-full gap-3 content-evenly">
            {nyhetsdata.map((item) => (
              <h4>{item.title}</h4>
            ))}
          </div>
        </div>
      </div>
    </LayoutIntranet>
  );
}
