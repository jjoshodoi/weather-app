import React from "react";

const DisplayDate = ({ tomorrow }) => {
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

  var todayOrTomorrowText = "Today";

  var d = new Date();
  if (tomorrow) {
    d.setDate(d.getDate() + 1);
    todayOrTomorrowText = "Tomorrow";
  }

  var day = days[d.getDay() - 1];
  var date = d.getDate();
  var month = months[d.getMonth()];
  // console.log(day, month, date);

  return (
    <div>
      <h1>{todayOrTomorrowText}</h1>
      <h2>
        {day} {date} {month}
      </h2>
    </div>
  );
};

export default DisplayDate;
