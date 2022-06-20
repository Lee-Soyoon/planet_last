import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import { DetailItem } from "./DetailList";
import SwipeableList from "../Swipeable/SwipeableList";
import { StyledDetailPageBlock } from "./StyledDetail";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../Footer/Footer";

function DetailCategory() {
  const history = useNavigate();
  const data = useLocation().state;
  const [detailList, setDetailList] = useState([]);

  const isEco = (ecoCnt) => (ecoCnt > 0 ? "eco" : ecoCnt < 0 ? "neco" : "etc");

  const onSwipe = (index) => {
    setTimeout(() => {
      setDetailList(detailList.filter((item) => item.id !== parseInt(index)));
      detailList.find((x) => {
        if (x.id === parseInt(index)) {
          fetchData(x.id, x.income);
        }
      });
    }, 2000);
  };

  useEffect(() => {
    if (data.typeDetail !== undefined || data.typeDetail !== null) {
      setDetailList(data.typeDetail);
    }
  }, [data]);

  const fetchData = async (index, income) => {
    const api = income ? "income" : "expenditure";
    const response = await fetch(`/${api}/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
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
              <div className="detail-type">{data.typeName}</div>
            </div>
            <div className="detail-cost">
              <div className="detail-info">
                <div className="detail-cost-label">수입</div>
                <div className="detail-cost-value">내역 없음</div>
              </div>
              <div className="detail-info">
                <div className="detail-cost-label">지출</div>
                <div className="detail-cost-value">
                  {data.typeCost.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>

          <div className="detail-div-list">
            <div className="detail-history">내역</div>
            {detailList.length !== 0 &&
              detailList.value.map((item) => {
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
                  //onClick-Link to 추가할 것
                  <Link
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
                        <div className={`details-circle ${isEco(ecoCnt)}`}>
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
      </StyledDetailPageBlock>
      <Footer activeMenu="calendar" />
    </>
  );
}

export default DetailCategory;
