import React from "react";
import MyCalendar from "./MyCalendar";
import Slide from "@mui/material/Slide";
import "./App.css";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      // main: "#353b48",
      main: "#F5B041",
      contrastText: "#fff",
    },
    success: {
      // main: "#353b48",
      main: "#1dd1a1",
      contrastText: "#fff",
    },
  },
});
const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
};

export default App;
