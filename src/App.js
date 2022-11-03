import React from "react";
import MyCalendar from "./MyCalendar";
import Slide from "@mui/material/Slide";
import "./App.css";
import { SnackbarProvider } from "notistack";
const App = () => {
  return (
    <>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
      >
        <MyCalendar />
      </SnackbarProvider>
    </>
  );
};

export default App;
