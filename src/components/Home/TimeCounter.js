import React, { useEffect, useState } from "react";

function TimeCounter(props) {
  const [timeFlashSale, setTimeFlashSale] = useState(0);
  const [displayTimeFlashSale, setdisplayTimeFlashSale] = useState(
    "00 giờ 00 phút 00 giây"
  );
  const newDate = new Date();

  const countTimeFlashSale = () => {
    let timeCurrent =
      newDate.getHours() * 60 * 60 +
      newDate.getMinutes() * 60 +
      newDate.getSeconds();
    let timeOneDay = 86400;

    setTimeFlashSale(timeOneDay - timeCurrent);
  };

  useEffect(() => {
    let timeCountDown = setTimeout(() => {
      if (timeFlashSale < 1) {
        clearTimeout(timeCountDown);
      } else {
        setTimeFlashSale((prev) => prev - 1);
      }
    }, 1000);
    const h = Math.floor(timeFlashSale / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((timeFlashSale % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(timeFlashSale % 60)
        .toString()
        .padStart(2, "0");

    setdisplayTimeFlashSale(h + " giờ " + m + " phút " + s + " giây");
    return () => {
      clearTimeout(timeCountDown);
    };
  }, [timeFlashSale]);

  useEffect(() => {
    countTimeFlashSale();
    window.scrollTo(0, 0);
  }, []);
  return (
    <span className="ms-3" style={{ color: "yellow" }}>
      {displayTimeFlashSale}
    </span>
  );
}

export default TimeCounter;
