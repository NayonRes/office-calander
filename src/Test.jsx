import React, { useState } from "react";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

export default function Test() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  return (
    <>
      <DateRangePicker
        onChange={(item) => {
          console.log("item", item);
          setState([item.selection]);
        }}
        editableDateInputs={true}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />
    </>
  );
}
