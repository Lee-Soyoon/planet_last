import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import "./Statistics.css";
import DateHeader from "../../components/DateHeader";
import ko from "date-fns/locale/ko";
import HistorySample from "../../components/History/HistoryBack";

function StatisticsWays(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { way, year, month } = useParams();
  const income = way === "income" ? true : false;
  const nowMFormat = "M";
  const [detailList, setDetailList] = useState(tempData);
  const [message, setMessage] = useState(0);
  const [detailDtoList, setDetailDtoList] = useState([]);
  const [message2, setMessage2] = useState(0);
  const [detailDtoList2, setDetailDtoList2] = useState([]);
  const wayEmoji = (way) => (way === "은행" ? "🏦" : (way === "카드" ? "💳" : "💵"));

  const fetchData = async () => {
    const response = await fetch(
      `/statistics/${way}/${format(currentMonth, "yyyy")}/${format(
        currentMonth,
        "M"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDetailList(data.detailDtoList);
      })
      .catch((error) => {
        console.log("error!");
        console.log(error);
      });
    const data = await response.json();
    setMessage(data);
    setDetailDtoList(data.detailDtoList);
  };
  useEffect(() => {
    if (year !== null || month !== null)
      setCurrentMonth(new Date(year, month - 1, 1));
    // fetchData();
    setMessage(tempData);
    setDetailDtoList(tempData.detailDtoList);
    setMessage2(tempData2);
    setDetailDtoList2(tempData2.detailDtoList);
  }, [year, month]);

  if (props.name === "eco") {
    return (
      <div className="static-detail-container">
        <DateHeader
          goBack={true}
          getDate={currentMonth}
          sendDate={(date) => setCurrentMonth(date)}
        />
        <div className="detail-box">
          <div className="income-detail-box">
            <p>
              {format(currentMonth, nowMFormat)}월 {income ? "수입" : "지출"} 총액
            </p>
            <h1>{message.totalMonthIncome}원</h1>
          </div>
          <div className="balloon2">
            <p>지난달 이맘때보다</p>
            <h1>
              약 <b style={{ color: "#00C982" }}>{message.inDif}{" "}
                {message.inMore ? "더 " : "덜"}</b>들어왔어요
            </h1>
          </div>
        </div>

        <div className="line-box" />

        <div className="statistics-box">
          {detailDtoList.map((data) => {
            return (
              <>
                <p className="statistic-detail-list date">
                  {format(parseISO(data.date), "d일 EEEE", { locale: ko })}
                </p>
                {data.detailDtoList.map((value) => {
                  return (
                    <div key={value.id} className="statistic-detail-list">
                      <span
                        role="img"
                        aria-label="something"
                        className="stat-detail-icon"
                      >
                        {wayEmoji(value.way)}
                      </span>
                      <p className="stat-detail-type">
                        {value.memo === null ? value.type : value.memo}
                      </p>
                      <p className="stat-detail-money">
                        {value.income ? "+" : "-"}
                        {value.cost.toLocaleString()}원
                      </p>
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="static-detail-container">
        <DateHeader
          goBack={true}
          getDate={currentMonth}
          sendDate={(date) => setCurrentMonth(date)}
        />
        <div className="detail-box">
          <div className="income-detail-box">
            <p>
              {format(currentMonth, nowMFormat)}월 {income ? "수입" : "지출"} 총액
            </p>
            <h1>{message2.totalMonthExpenditure}원</h1>
          </div>
          <div className="balloon2">
            <p>지난달 이맘때보다</p>
            <h1>
              약 <b style={{ color: "#00C982" }}>{message2.exDif}{" "}
                {message2.exMore ? "더 " : "덜"}</b>썼어요
            </h1>
          </div>
        </div>

        <div className="line-box" />

        <div className="statistics-box">
          {detailDtoList.map((data) => {
            return (
              <>
                <p className="statistic-detail-list date">
                  {format(parseISO(data.date), "d일 EEEE", { locale: ko })}
                </p>
                {data.detailDtoList.map((value) => {
                  return (
                    <div key={value.id} className="statistic-detail-list">
                      <span
                        role="img"
                        aria-label="something"
                        className="stat-detail-icon"
                      >
                        {wayEmoji(value.way)}
                      </span>
                      <p className="stat-detail-type">
                        {value.memo === null ? value.type : value.memo}
                      </p>
                      <p className="stat-detail-money">
                        {value.income ? "+" : "-"}
                        {value.cost.toLocaleString()}원
                      </p>
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

StatisticsWays.defaultProps = {
  income: true,
};
const tempData = {
  "totalMonthIncome": 880,
  "totalMonthExpenditure": 92000,
  "inMore": true,
  "exMore": true,
  "inDif": 880,
  "exDif": 92000,
  "detailDtoList": [
    {
      date: "2022-04-26",
      detailDtoList: [
        {
          id: 1,
          way: "현금",
          type: "경조사/회비",
          cost: 92503,
          memo: "income memo",
          ecoList: null,
          income: true,
        },
        {
          id: 2,
          way: "은행",
          type: "월급",
          cost: 1726000,
          memo: null,
          ecoList: null,
          income: true,
        },
        {
          id: 13,
          way: "카드",
          type: "생필품",
          cost: 4990,
          memo: "비누",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
            {
              eco: "G",
              ecoDetail: "비건식당 방문",
              etcMemo: null,
            },
          ],
          income: false,
        },
        {
          id: 14,
          way: "카드",
          type: "가전",
          cost: 50000,
          memo: "가스레인지",
          ecoList: null,
          income: false,
        },
      ],
    },
    {
      date: "2022-04-27",
      detailDtoList: [
        {
          id: 15,
          way: "은행",
          type: "생필품",
          cost: 92503,
          memo: "텀블러",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
          ],
          income: false,
        },
        {
          id: 16,
          way: "카드",
          type: "식비",
          cost: 92503,
          memo: "학식",
          ecoList: null,
          income: false,
        },
      ],
    },
  ]
};

const tempData2 = {
  "totalMonthIncome": 880,
  "totalMonthExpenditure": 92000,
  "inMore": true,
  "exMore": true,
  "inDif": 880,
  "exDif": 92000,
  "detailDtoList": [
    {
      date: "2022-04-26",
      detailDtoList: [
        {
          id: 1,
          way: "현금",
          type: "경조사/회비",
          cost: 92503,
          memo: "income memo",
          ecoList: null,
          income: true,
        },
        {
          id: 2,
          way: "은행",
          type: "월급",
          cost: 1726000,
          memo: null,
          ecoList: null,
          income: true,
        },
        {
          id: 13,
          way: "카드",
          type: "생필품",
          cost: 4990,
          memo: "비누",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
            {
              eco: "G",
              ecoDetail: "비건식당 방문",
              etcMemo: null,
            },
          ],
          income: false,
        },
        {
          id: 14,
          way: "카드",
          type: "가전",
          cost: 50000,
          memo: "가스레인지",
          ecoList: null,
          income: false,
        },
      ],
    },
    {
      date: "2022-04-27",
      detailDtoList: [
        {
          id: 15,
          way: "은행",
          type: "생필품",
          cost: 92503,
          memo: "텀블러",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
          ],
          income: false,
        },
        {
          id: 16,
          way: "카드",
          type: "식비",
          cost: 92503,
          memo: "학식",
          ecoList: null,
          income: false,
        },
      ],
    },
  ]
};

//const id = " user1@naver.com";

// const fetchData = () => {
//   fetch(
//     `/statistics/${way}/${id}/${format(currentMonth, "yyyy")}/${format(
//       currentMonth,
//       "M"
//     )}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       }
//     }
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       setDetailList(data.detailDtoList);
//     })
//     .catch((error) => {
//       console.log("error!");
//       console.log(error);
//     });
// };

export default StatisticsWays;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { format, parseISO } from "date-fns";
// import "./Statistics.css";
// import DateHeader from "../../components/DateHeader";
// import ko from "date-fns/locale/ko";
// import HistorySample from "../../components/History/HistoryBack";

// function StatisticsWays() {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const { way, year, month } = useParams();
//   const income = way === "income" ? true : false;
//   const nowMFormat = "M";
//   const [detailList, setDetailList] = useState(tempData);
//   const wayEmoji = (way) => (way === "은행" ? "🏦" : "카드" ? "💳" : "💰");

//   useEffect(() => {
//     if (year !== null || month !== null)
//       setCurrentMonth(new Date(year, month - 1, 1));
//   }, [year, month]);

//   return (
//     <div className="static-detail-container">
//       <DateHeader
//         goBack={true}
//         getDate={currentMonth}
//         sendDate={(date) => setCurrentMonth(date)}
//       />
//       <div className="detail-box">
//         <div className="income-detail-box">
//           <p>
//             {format(currentMonth, nowMFormat)}월 {income ? "수입" : "지출"} 총액
//           </p>
//           <h1>800,000원</h1>
//         </div>
//         <div className="balloon2">
//           <p>지난달 이맘때보다</p>
//           <h1>
//             약 <b style={{ color: "#00C982" }}>10만원 더</b>{" "}
//             {income ? "들어왔" : "썼"}어요
//           </h1>
//         </div>
//       </div>

//       <div className="line-box" />

//       <div className="statistics-box">
//         {detailList.map((data) => {
//           return (
//             <>
//               <p className="statistic-detail-list date">
//                 {format(parseISO(data.date), "d일 EEEE", { locale: ko })}
//               </p>
//               {data.detailDtoList.map((value) => {
//                 return (
//                   <div key={value.id} className="statistic-detail-list">
//                     <span
//                       role="img"
//                       aria-label="something"
//                       className="stat-detail-icon"
//                     >
//                       {wayEmoji(value.way)}
//                     </span>
//                     <p className="stat-detail-type">
//                       {value.memo === null ? value.type : value.memo}
//                     </p>
//                     <p className="stat-detail-money">
//                       {value.income ? "+" : "-"}
//                       {value.cost.toLocaleString()}원
//                     </p>
//                   </div>
//                 );
//               })}
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// StatisticsWays.defaultProps = {
//   income: true,
// };
// const tempData = [
//   {
//     date: "2022-04-26",
//     detailDtoList: [
//       {
//         id: 1,
//         way: "현금",
//         type: "경조사/회비",
//         cost: 92503,
//         memo: "income memo",
//         ecoList: null,
//         income: true,
//       },
//       {
//         id: 2,
//         way: "은행",
//         type: "월급",
//         cost: 1726000,
//         memo: null,
//         ecoList: null,
//         income: true,
//       },
//       {
//         id: 13,
//         way: "카드",
//         type: "생필품",
//         cost: 4990,
//         memo: "비누",
//         ecoList: [
//           {
//             eco: "G",
//             ecoDetail: "친환경 제품 구매",
//             etcMemo: null,
//           },
//           {
//             eco: "N",
//             ecoDetail: "기타",
//             etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
//           },
//           {
//             eco: "G",
//             ecoDetail: "비건식당 방문",
//             etcMemo: null,
//           },
//         ],
//         income: false,
//       },
//       {
//         id: 14,
//         way: "카드",
//         type: "가전",
//         cost: 50000,
//         memo: "가스레인지",
//         ecoList: null,
//         income: false,
//       },
//     ],
//   },
//   {
//     date: "2022-04-27",
//     detailDtoList: [
//       {
//         id: 15,
//         way: "은행",
//         type: "생필품",
//         cost: 92503,
//         memo: "텀블러",
//         ecoList: [
//           {
//             eco: "G",
//             ecoDetail: "친환경 제품 구매",
//             etcMemo: null,
//           },
//           {
//             eco: "N",
//             ecoDetail: "기타",
//             etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
//           },
//         ],
//         income: false,
//       },
//       {
//         id: 16,
//         way: "카드",
//         type: "식비",
//         cost: 92503,
//         memo: "학식",
//         ecoList: null,
//         income: false,
//       },
//     ],
//   },
// ];
//const id = " user1@naver.com";

// const fetchData = () => {
//   fetch(
//     `/statistics/${way}/${id}/${format(currentMonth, "yyyy")}/${format(
//       currentMonth,
//       "M"
//     )}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       }
//     }
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       setDetailList(data.detailDtoList);
//     })
//     .catch((error) => {
//       console.log("error!");
//       console.log(error);
//     });
// };

//export default StatisticsWays;