import React, { useState, useEffect } from "react";

const DisplayDate = () => {
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var d = new Date();
  var day = days[d.getDay()];
  var date = d.getDate();
  var month = months[d.getMonth()];
  console.log(day, month, date);

  return (
    <div>
      <h1>Today</h1>
      <h2>
        {day} {date} {month}
      </h2>
    </div>
  );
};

export default DisplayDate;
