import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Holidays from "./Holidays";
import AttendanceSummary from "./AttendanceSummary";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip
    placement="top"
    arrow={true}
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  // [`& .${tooltipClasses.arrow}`]: {
  //   color: theme.palette.common.white,
  //   boxShadow: theme.shadows[1],
  // },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}));
const weaklyHolidaysColor = "#F5B041";
const useStyles = makeStyles({
  monthSection: {
    // border: "1px solid #ddd",
    padding: "10px",
    minHeight: "210px",
  },
  monthTitle: {
    textAlign: "center",
    background: "black",
    color: "white",
    margin: "0 0 10px 0",
    padding: "3px 0",
    position: "relative",
    borderRadius: "0px 15px",
  },
  monthNoStyle: {
    background: weaklyHolidaysColor,
    position: "absolute",
    padding: "3px 0",
    minWidth: "60px",
    borderRadius: "0px 15px",
    top: 0,
    left: "-1px",
  },
  holidayCard: {
    background: "#fff",
    // textAlign: "center",
    margin: "5px 20px",
    padding: " 15px 5px 15px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  holidayCardTitle: {
    margin: "0px 0 8px 0",
    color: weaklyHolidaysColor,
    fontSize: "18px",
    fontWeight: 500,
    textAlign: "center",
  },
  holidayCardDays: {
    margin: "0px !important",
    fontSize: "18px !important",
    fontWeight: 600,
    fontWeight: "bold",
    textAlign: "center",
  },
  holidayCardDes: {
    margin: "0px !important",
    fontSize: "14px",
    color: "#838383",
    letterSpacing: "3px",
    fontWeight: 400,
    textAlign: "center",
  },
  activeStyle: {
    // background: "#1dd1a1 !important",
    // color: "#fff",
    borderLeft: "3px solid #1dd1a1",
    borderTop: "1px solid #1dd1a1",
    borderRight: "3px solid #1dd1a1",
    borderBottom: "1px solid #1dd1a1",
  },
  summeryTableStyle: {
    border: "1px solid #ddd !important",
    borderRadius: "10px !important",
    marginBottom: 8,
    "& td": {
      padding: "7px !important",
      fontSize: "12px",
      // borderBottom: "none !important",
    },
  },
  successButtonStyle: {
    minWidth: "110px !important",
    border: "1px solid #1dd1a1 !important",
    color: "#1dd1a1 !important",
    fontSize: "12px !important",

    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    borderRadius: "4px",
    padding: "4px",
  },
  errorButtonStyle: {
    minWidth: "110px !important",
    border: "1px solid #ee5253 !important",
    color: "#ee5253 !important",
    fontSize: "12px !important",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    borderRadius: "4px",
    padding: "4px",
  },
});
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
function App() {
  // console.log("Holidays", Holidays);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [active, setActive] = useState("Govt. Holidays");
  const [userDays, setUserDays] = useState(Holidays);
  const [editYear, setEditYear] = useState(false);
  const [value, setValue] = React.useState(dayjs(new Date()));

  const totalCasualLeave = 10;
  const totalMediacalLeave = 10;
  const totalAnnualLeave = 20;
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const dateBlockPrintNo = 42;
  const mainColor = "black";

  const weaklyHolidaysIndexNo = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34];
  let weekdayNames = [
    { dayNo: 0, name: "Sun" },
    { dayNo: 1, name: "Mon" },
    { dayNo: 2, name: "Tue" },
    { dayNo: 3, name: "Wed" },
    { dayNo: 4, name: "Thu" },
    { dayNo: 5, name: "Fri" },
    { dayNo: 6, name: "Sat" },
  ];
  let months = [
    {
      monthNo: "01",
      name: "January",
      days: 31,
    },
    {
      monthNo: "02",
      name: "February",
      days: 28,
    },
    {
      monthNo: "03",
      name: "March",
      days: 31,
    },
    {
      monthNo: "04",
      name: "April",
      days: 30,
    },
    {
      monthNo: "05",
      name: "May",
      days: 31,
    },
    {
      monthNo: "06",
      name: "June",
      days: 30,
    },
    {
      monthNo: "07",
      name: "July",
      days: 31,
    },
    {
      monthNo: "08",
      name: "August",
      days: 31,
    },
    {
      monthNo: "09",
      name: "September",
      days: 30,
    },
    {
      monthNo: "10",
      name: "October",
      days: 31,
    },
    {
      monthNo: "11",
      name: "November",
      days: 30,
    },
    {
      monthNo: "12",
      name: "December",
      days: 31,
    },
  ];
  const changeMenu = (id) => {
    if (id === "Govt. Holidays") {
      setUserDays(Holidays);
    } else if (id === "Attendance Summary") {
      setUserDays(AttendanceSummary.filter((item) => item.type === "Present"));
    } else if (id === "Casual Leaves") {
      setUserDays(
        AttendanceSummary.filter((item) => item.type === "Casual Leave")
      );
    } else if (id === "Medical Leaves") {
      setUserDays(
        AttendanceSummary.filter((item) => item.type === "Medical Leave")
      );
    } else if (id === "Annual Leaves") {
      setUserDays(
        AttendanceSummary.filter((item) => item.type === "Annual Leave")
      );
    }
    setActive(id);
    console.log("id", id);
  };
  const getFirstdayOfTheYear = () => {
    console.log("current year", new Date().getFullYear());
    let year = currentYear;
    // setCurrentYear(year);
    const isLeapYear = year % 4;
    console.log("isLeapYear", isLeapYear);
    if (isLeapYear === 0) {
      months[1].days = 29;
    }
    let firstDay = new Date(year, 0, 1);

    // console.log("firstDay", firstDay.getDay());
    return firstDay.getDay();
  };
  useEffect(() => {
    let firstdayNo = getFirstdayOfTheYear();
    console.log("firstdayNo", firstdayNo);

    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      new Date().getDay()
    ];
    console.log("weekday", weekday);
    console.log("fomate date", moment(new Date()).format("DD-MM-YYYY"));
  }, []);
  const calculateSkipNo = (no) => {
    console.log("calculateSkipNo", no);
  };
  const calculateCasualLeaves = () => {
    let remain =
      totalCasualLeave -
      AttendanceSummary.filter((item) => item.type === "Casual Leave").length;
    if (remain < 10) {
      return `0${remain}`;
    }
    return remain;
  };
  const calculateMedicalLeaves = () => {
    let remain =
      totalMediacalLeave -
      AttendanceSummary.filter((item) => item.type === "Medical Leave").length;
    if (remain < 10) {
      return `0${remain}`;
    }
    return remain;
  };
  const calculateAnnualLeaves = () => {
    let remain =
      totalAnnualLeave -
      AttendanceSummary.filter((item) => item.type === "Annual Leave").length;
    console.log("remain", remain);
    if (remain < 10) {
      return `0${remain}`;
    }
    return remain;
  };
  const checkHoliday = (index, skipNo, month, day) => {
    let holidayObj = userDays.filter(
      (holiday) => holiday["monthName"] === month.name && holiday["day"] === day
    );

    if (holidayObj.length > 0) {
      return (
        <LightTooltip title={fnCheckTimes(holidayObj[0])}>
          {/* <LightTooltip title={`${holidayObj[0].description}`}> */}
          <div
            style={{
              background: holidayObj.length > 0 ? "#dfdfdf" : "",
              borderRadius: "4px",
              margin: "auto",
              fontWeight: "bold",
            }}
          >
            {skipNo <= index &&
              index - skipNo < month?.days &&
              index - skipNo + 1}
          </div>
        </LightTooltip>
      );
    }
    return (
      <div
        style={{
          borderRadius: "4px",
          margin: "auto",
          fontWeight: "bold",
        }}
      >
        {skipNo <= index && index - skipNo < month?.days && index - skipNo + 1}
      </div>
    );
  };
  const selectedDate = (date) => {
    console.log("date", date);
  };
  let skipNo = 0;
  const fnCheckTimes = (obj) => {
    console.log("obj", obj);
    let result = "00:00";
    if (obj?.type === "Present") {
      let isLate = false;
      let isCompletedWorkingHours = false;
      let checkOut = obj?.checkOut;
      let checkIn = obj?.checkIn;
      let newCheckOut = checkOut.split(":");
      console.log("newCheckOut", newCheckOut);
      let newCheckIn = checkIn.split(":");
      console.log("newCheckIn", newCheckIn);

      let minDiff = parseInt(newCheckOut[1]) - parseInt(newCheckIn[1]);
      let hourDiff = parseInt(newCheckOut[0]) - parseInt(newCheckIn[0]);
      console.log("minDiff", minDiff);
      console.log("hourDiff", hourDiff);

      if (parseInt(newCheckIn[0]) > 10) {
        isLate = true;
      } else if (
        parseInt(newCheckIn[0]) === 10 &&
        parseInt(newCheckIn[1]) >= 30
      ) {
        isLate = true;
      }
      if (minDiff < 0) {
        minDiff = minDiff + 60;
        hourDiff = hourDiff - 1;
      }

      if (hourDiff > 8) {
        isCompletedWorkingHours = true;
      } else if (hourDiff === 8 && minDiff >= 30) {
        isCompletedWorkingHours = true;
      }
      if (minDiff < 10) {
        minDiff = `0${minDiff}`;
      }
      if (hourDiff < 10) {
        hourDiff = `0${hourDiff}`;
      }

      result = `${hourDiff}:${minDiff} hours || isCompletedWorkingHours :${isCompletedWorkingHours}, "late",${isLate}`;
      return (
        <>
          <h4 style={{ textAlign: "center", margin: 8 }}>
            Summery of {moment(obj?.date, "DD-MM-YYYY").format("DD MMMM, YYYY")}
          </h4>
          <Table
            aria-label="simple table"
            className={classes.summeryTableStyle}
          >
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  Check-In <br />
                  (10:30)
                </TableCell>
                <TableCell align="left">{obj?.checkIn}</TableCell>
                <TableCell align="left">
                  {" "}
                  <button
                    disabled
                    className={
                      isLate
                        ? classes.errorButtonStyle
                        : classes.successButtonStyle
                    }
                  >
                    {isLate ? "Late" : "In-Time"}
                  </button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Check-Out (19:00) </TableCell>
                <TableCell align="left">{obj?.checkOut}</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left"> Work Duration (8:30 hours)</TableCell>
                <TableCell align="left">
                  {hourDiff}:{minDiff} hours
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <button
                    disabled
                    className={
                      isLate
                        ? classes.errorButtonStyle
                        : classes.successButtonStyle
                    }
                  >
                    {isCompletedWorkingHours ? "Complete" : "Not Complete"}
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      );
    }
    return obj?.description;
  };

  return (
    <>
      <div style={{ maxWidth: "1366px", margin: "auto" }}>
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          // direction="column"
          style={{
            height: "125px",
            background: "#1dd1a1",
          }}
        >
          {/* <div> */}
          {/* <div>
            <p>Admin</p>
            <p>admin@gmail.com</p>
          </div> */}
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: "64px",
                fontWeight: "bold",
                letterSpacing: "10px",
                margin: 0,
                // textAlign: "center",
              }}
            >
              {currentYear}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // open={open}
                  // onOpen={() => setOpen(true)}
                  TextFieldComponent={() => null}
                  views={["year"]}
                  // label="Year only"
                  value={value}
                  onChange={(newValue) => {
                    console.log("newValue", dayjs(newValue).format("YYYY"));
                    setCurrentYear(dayjs(newValue).format("YYYY"));
                    setValue(newValue);
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",

                        "& input": {
                          position: "absolute",
                          top: -20,
                          // left: -75,
                        },
                        "& button": {
                          position: "absolute",
                          top: -65,
                          left: -75,
                          border: "1px solid #fff",
                        },
                        "& svg": {
                          fontSize: "40px",
                          color: "#fff",
                        },
                      }}
                    >
                      <input
                        style={{ visibility: "hidden" }}
                        ref={inputRef}
                        {...inputProps}
                      />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                 
                />
              </LocalizationProvider>
            </div>
          </div>
          <p
            style={{
              color: "#fff",
              fontSize: "65px",
              margin: 0,
              fontFamily: "'Passions Conflict', cursive",
              letterSpacing: "15px",
            }}
          >
            Calendar
          </p>

          {/* </div> */}
        </Grid>
        <Grid container style={{ display: "" }}>
          <Grid item xs={2.5} style={{ background: "#ddd" }}>
            <Grid container>
              <Grid item xs={12}>
                <div
                  className={`${classes.holidayCard} ${
                    active === "Govt. Holidays" && classes.activeStyle
                  }`}
                  onClick={() => changeMenu("Govt. Holidays")}
                >
                  <p className={classes.holidayCardTitle}> Govt. Holidays</p>
                  <p className={classes.holidayCardDays}>{Holidays.length}</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div
                  className={`${classes.holidayCard} ${
                    active === "Attendance Summary" && classes.activeStyle
                  }`}
                  onClick={() => changeMenu("Attendance Summary")}
                >
                  <p className={classes.holidayCardTitle}>
                    {" "}
                    Attendance Summary
                  </p>
                  <p className={classes.holidayCardDays}>
                    {AttendanceSummary.length}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div
                  className={`${classes.holidayCard} ${
                    active === "Casual Leaves" && classes.activeStyle
                  }`}
                  onClick={() => changeMenu("Casual Leaves")}
                >
                  <p className={classes.holidayCardTitle}>Casual Leaves</p>

                  <Grid container>
                    <Grid item xs={6} style={{ borderRight: "1px solid" }}>
                      <p className={classes.holidayCardDays}>
                        {totalCasualLeave}
                      </p>
                      <p className={classes.holidayCardDes}>Total</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.holidayCardDays}>
                        {calculateCasualLeaves()}
                      </p>
                      <p className={classes.holidayCardDes}> Remaining</p>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div
                  className={`${classes.holidayCard} ${
                    active === "Medical Leaves" && classes.activeStyle
                  }`}
                  onClick={() => changeMenu("Medical Leaves")}
                >
                  <p className={classes.holidayCardTitle}> Medical Leaves</p>

                  <Grid container>
                    <Grid item xs={6} style={{ borderRight: "1px solid" }}>
                      <p className={classes.holidayCardDays}>
                        {totalMediacalLeave}
                      </p>
                      <p className={classes.holidayCardDes}>Total</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.holidayCardDays}>
                        {calculateMedicalLeaves()}
                      </p>
                      <p className={classes.holidayCardDes}> Remaining</p>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div
                  className={`${classes.holidayCard} ${
                    active === "Annual Leaves" && classes.activeStyle
                  }`}
                  onClick={() => changeMenu("Annual Leaves")}
                >
                  <p className={classes.holidayCardTitle}> Annual Leaves</p>

                  <Grid container>
                    <Grid item xs={6} style={{ borderRight: "1px solid" }}>
                      <p className={classes.holidayCardDays}>
                        {totalAnnualLeave}
                      </p>
                      <p className={classes.holidayCardDes}>Total</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.holidayCardDays}>
                        {calculateAnnualLeaves()}
                      </p>
                      <p className={classes.holidayCardDes}> Remaining</p>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.holidayCard}>
                  <p className={classes.holidayCardTitle}> Events</p>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Annual Tour</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body2"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1600s
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography>Anniversary Celebration</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body2"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography>Office Day-Out</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body2"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9.5} style={{ background: "#fff" }}>
            <Grid container spacing={0.5}>
              {months?.map((m, index) => {
                if (index === 0) {
                  skipNo = getFirstdayOfTheYear();
                } else {
                  skipNo = (skipNo + months[index - 1].days) % 7;
                }

                return (
                  <Grid key={index} item xs={3}>
                    <div className={classes.monthSection}>
                      <p className={classes.monthTitle}>
                        {m.name}
                        <div className={classes.monthNoStyle}>{m.monthNo}</div>
                      </p>
                      <Grid container spacing={1}>
                        {weekdayNames?.map((d, i) => (
                          <Grid
                            key={i}
                            item
                            xs={1.714285714285714}
                            style={{
                              textAlign: "center",
                              color: weaklyHolidaysIndexNo.includes(i)
                                ? weaklyHolidaysColor
                                : mainColor,
                              fontWeight: "bold",
                              fontSize: "14px",
                            }}
                          >
                            {d?.name}
                          </Grid>
                        ))}
                      </Grid>
                      <br />
                      <Grid container spacing={1}>
                        {[...Array(dateBlockPrintNo).keys()].map((no, i) => {
                          return (
                            <Grid
                              key={i}
                              item
                              xs={1.714285714285714}
                              style={{
                                textAlign: "center",
                                color: weaklyHolidaysIndexNo.includes(i)
                                  ? weaklyHolidaysColor
                                  : mainColor,
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                              onClick={() => selectedDate(i - skipNo + 1)}
                            >
                              {checkHoliday(i, skipNo, m, i - skipNo + 1)}
                            </Grid>
                          );
                        })}
                      </Grid>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
