import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import { DetailItem } from "./DetailList";
import SwipeableList from "../Swipeable/SwipeableList";
import { StyledDetailPageBlock } from "./StyledDetail";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../Footer/Footer";
import axios from "axios";

const emoji = {
  급여: "💰",
  용돈: "👛",
  식비: "🌭",
  교통: "🚗",
  문화생활: "🎬",
  생필품: "✏️",
  마트: "🛒",
  교육: "📚",
  통신: "📱",
  "의료/건강": "🏥",
  "경조사/회비": "💵",
  가전: "🛏",
  공과금: "🧾",
  기타: "💬",
};

const isEco = (ecoCnt) => (ecoCnt > 0 ? "eco" : ecoCnt < 0 ? "neco" : "etc");

const fetchData = async (index, income, userId) => {
  const api = income ? "income" : "expenditure";
  const response = await axios({
    method: "DELETE",
    url: `https://플랜잇.웹.한국:8080/api/${api}/${index}`,
    headers: { userId: userId },
  });
};

function DetailCategory() {
  const history = useNavigate();
  const data = useLocation().state;
  const [detailMoney, setDetailMoney] = useState({ income: 0, expend: 0 });
  const [detailList, setDetailList] = useState([]);

  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    if (data.typeDetail !== undefined || data.typeDetail !== null) {
      setDetailList(data.typeDetail.value);
      if (detailMoney.income === 0 && detailMoney.expend === 0) {
        let incomeTmp = 0;
        let expendTmp = 0;
        data.typeDetail.value.map((data) => {
          if (data.income) incomeTmp += data.cost;
          else expendTmp += data.cost;
        });
        setDetailMoney({ income: incomeTmp, expend: expendTmp });
      }
    }
  }, [data]);
  console.log(detailList);

  const onSwipe = (index) => {
    setTimeout(() => {
      setDetailList(detailList.filter((item) => item.id !== parseInt(index)));
      detailList.find((x) => {
        if (x.id === parseInt(index)) {
          if (x.income) {
            setDetailMoney({
              ...detailMoney,
              income: detailMoney.income - x.cost,
            });
          } else {
            setDetailMoney({
              ...detailMoney,
              expend: detailMoney.expend - x.cost,
            });
          }
          fetchData(x.id, x.income, userId);
        }
      });
    }, 2000);
  };

  console.log(data);

  return (
    <StyledDetailPageBlock>
      <div className="detail-page">
        <div className="detail-info-block">
          <div className="selected-date">
            {format(data.date, "M. d EEEEE", { locale: ko })}
          </div>
          <div className="detail-info">
            <IoIosArrowForward
              className="forward-arrow"
              onClick={() => {
                history(-1);
              }}
            />
            <div className="detail-type">
              {emoji[data.type.name]}
              &nbsp;
              {data.type.name}
            </div>
          </div>
          <div className="detail-cost">
            <div className="detail-info">
              <div className="detail-cost-label">수입</div>
              <div
                className={`detail-cost-value ${
                  detailMoney.income === 0 ? "none" : ""
                }`}
              >
                {detailMoney.income !== 0
                  ? detailMoney.income.toLocaleString()
                  : "내역 없음"}
                원
              </div>
            </div>
            <div className="detail-info">
              <div className="detail-cost-label">지출</div>
              <div
                className={`detail-cost-value ${
                  detailMoney.expend === 0 ? "none" : ""
                }`}
              >
                {detailMoney.expend !== 0
                  ? detailMoney.expend.toLocaleString()
                  : "내역 없음"}
                원
              </div>
            </div>
          </div>
        </div>

        <div className="detail-div-list">
          <div className="detail-history">내역</div>
          {detailList.length !== 0 &&
            detailList.map((item) => {
              let ecoCnt = 0;
              item.ecoList !== undefined &&
                item.ecoList.forEach((item) => {
                  if (item.eco === "G") {
                    ecoCnt += 1;
                  } else if (item.eco === "R") {
                    ecoCnt -= 1;
                  }
                });
              return (
                <Link
                  key={item.id}
                  className="detail-link"
                  to={`/statisticsModify`}
                  style={{ textDecoration: "none", color: "white" }}
                  state={{
                    item: item,
                    date: data.date,
                  }}
                >
                  <SwipeableList key={item.id} onSwipe={onSwipe}>
                    <div className="details" key={item.id}>
                      <div
                        className={`details-circle ${isEco(ecoCnt)} ${
                          item.income ? "none" : ""
                        }`}
                      >
                        ● &nbsp;
                      </div>
                      <DetailItem item={item} ecoCnt={ecoCnt} />
                    </div>
                  </SwipeableList>
                </Link>
              );
            })}
        </div>
      </div>

      <Footer activeMenu="calendar" />
    </StyledDetailPageBlock>
  );
}

export default DetailCategory;
