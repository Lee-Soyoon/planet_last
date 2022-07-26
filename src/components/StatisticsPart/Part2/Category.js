import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Category.css";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { message } from "antd";

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

function Category() {
  const history = useNavigate();
  const [message, setMessage] = useState([]);
  const [message2, setMessage2] = useState([]);
  const [loading, setloading] = useState(true);

  const renderexTypeList = (ecodata, message) => {
    let renderexTypeList = [];

    if (message.length !== 0 || message2.length !== 0) {
      if (ecodata.name === "eco") {
        for (let i = 0; i < message.length; i++) {
          renderexTypeList.push(
            // <Link to={`/detail`}
            //   state={{
            //     exType: expendData[i].exType,
            //     emoji: expendData[i].emoji,
            //     count: expendData[i].count,
            //     ecodata: ecodata.name,
            //   }}
            // >
            <div className="category-box">
              <p className="emoji">{emoji[message[i][0]]} </p>
              <h2>
                {message[i][0]}
                {" | "}
                {message[i][1]}%
              </h2>
              <IoIosArrowForward className="detail-icon" />
              <h1 className="count">{message[i][2]}개</h1>
            </div>

            // </Link>
          );
        }
      } else {
        for (let i = 0; i < message.length; i++) {
          renderexTypeList.push(
            // <Link to={`/detail`}
            //   state={{
            //     exType: expendData[i].exType,
            //     emoji: expendData[i].emoji,
            //     count: expendData[i].count,
            //     ecodata: ecodata.name,
            //     memo: expendData[i].memo,
            //   }}
            // >

            <div className="category-box">
              <p className="emoji">{emoji[message2[i][0]]} </p>
              <h2>
                {message[i][0]}
                {" | "}
                {message[i][1]}%
              </h2>
              <IoIosArrowForward className="detail-icon" />
              <h1 className="count">{message[i][2]}개</h1>
            </div>

            // </Link>
          );
        }
      }
    }

    return <div>{renderexTypeList}</div>;
  };

  const fetchData = async () => {
    const response = await fetch(
      `/statistics/ecoCountsDetail/2022/3`,
      //${format(new Date(), "M")}
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    setMessage(data.tagList);
    setloading(false);
  };

  const fetchData2 = async () => {
    const response = await fetch(
      `/statistics/noEcoCountsDetail/2022/3`,
      //${format(new Date(), "M")}
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data2 = await response.json();
    setMessage2(data2.tagList);
    console.log(data2);
    setloading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // fetchData();
    // fetchData2();
    setMessage(data.tagList);
    setMessage2(data2.tagList);
    setloading(false);
  }, []);

  console.log(message);
  console.log(message2);
  const ecodata = useLocation().state;

  if (loading) return <div>loading...</div>;
  if (ecodata.name === "eco") {
    return (
      <div className="container">
        <div className="header">
          <FaChevronLeft
            className="forwardArrow"
            onClick={() => {
              history(-1);
            }}
          />
          <h1 className="cateGory">친환경 지출 카테고리</h1>
          <h1 className="title">지출 카테고리별 소비</h1>
        </div>
        {renderexTypeList(ecodata, message)}
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="header">
          <FaChevronLeft
            className="forward-arrow"
            onClick={() => {
              history(-1);
            }}
          />
          <h1 className="cateGory">반환경 지출 카테고리</h1>
          <h1 className="title">지출 카테고리별 소비</h1>
        </div>
        {renderexTypeList(ecodata, message2)}
      </div>
    );
  }
}

export default Category;

const data = {
  tagList: [
    ["식비", 50, 6],
    ["기타", 17, 2],
    ["생필품", 17, 2],
    ["급여", 17, 2],
  ],
};
const data2 = {
  tagList: [
    ["식비", 50, 3],
    ["급여", 17, 1],
    ["기타", 17, 1],
    ["생필품", 17, 1],
  ],
};
