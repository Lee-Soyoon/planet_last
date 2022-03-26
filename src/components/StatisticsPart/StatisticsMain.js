import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { format, subMonths, addMonths } from "date-fns";
import "./Statistics.css";
import { IoIosArrowForward } from "react-icons/io";
import DonutChart from "./DonutChart";
import HorizonChart from "./HorizonChart";
import LineGraph from "./LineGraph";
import Chart from 'chart.js/auto';
import Eco from './Part2/EcoExpend';
import Pollution from './Part2/PollutionExpend';
import { EcoBarChart } from './Part2/EcoBarChart';
import EcoCategory from '../../pages/Statistics/Part2/EcoCategory';

function StatisticsMain() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(true);
  const [monthView, setMonthView] = useState();
  const [animation, setanimation] = useState("");

  useEffect(() => {
    setMonthView();
  }, [selectedDate, currentMonth]);

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const renderHeader = () => {
    const yNmFormat = "yyyy년 M월";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <IoIosArrowForward
            className="icon"
            onClick={() => changeMonthHandle("prev")}
          />
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, yNmFormat)}</span>
        </div>
        <div className="col col-end">
          <IoIosArrowForward
            className="icon"
            onClick={() => changeMonthHandle("next")}
          />
        </div>
      </div>
    );
  };

  const nowMFormat = "M";

  return (
    <div className="calendar">
      {renderHeader()}
      <div className={`${animation}`}>
        {isMonthView && (
          <>
          <Link to="/StatisticsView">
          <div className="month-box">
              <div className="month-breakdown">
                  <p>{format(currentMonth, nowMFormat)}월 내역</p>
                  <IoIosArrowForward className="box-icon" />
              </div>

              <div className="month-breakdown">
                  <p>수입</p>
                  <h1>780,120원</h1>
              </div>

              <div className="month-breakdown">
                  <p>지출</p>
                  <h1>50,120원</h1>
              </div>
          </div>
          </Link>

          <div className="line-box"></div>

          <div className="tag-graph-box">
              <h1>친환경 별자리 관측소 <img src="img/scope.png" alt="scope"></img></h1>

              <p>지난달 이맘때보다</p>
              <h2>친환경 태그가 <b style={{color:"#00C982"}}>5개</b> 늘었어요</h2>

              <LineGraph></LineGraph>
          </div>

          <div className="line-box"></div>

          <div className="chart-graph-box">
              <h1>수빈님의 지출은 건강한가요?</h1>
              <div style={{textAlign:"center"}}>
                <p style={{color:"#07D4A9"}}><span>●</span> 11</p>
                <p style={{color:"#3A4556"}}><b style={{color:"#566479"}}>●</b> 13</p>
              </div>
              <div className="donut-chart"><DonutChart /></div>
          </div>
          <div className="line-box"></div>

          <Link to="/EcoCategory">
          <div className="expend-box">
              <h1>어떤 친환경 지출을 했을까요? 👍</h1>
              <IoIosArrowForward className="box-icon" />
          </div>
          </Link>
          <div className='chart'>
          <EcoBarChart></EcoBarChart>
          </div>
          <Eco></Eco>

          <div className="line-box"></div>

          <Link to="#">
          <div className="expend-box">
              <h1>어떤 반환경 지출을 했을까요? 👎</h1>
              <IoIosArrowForward className="box-icon" />
          </div>
          </Link>
          <Pollution></Pollution>
          </>
        )}
      </div>
    </div>
  );
}

export default StatisticsMain;
