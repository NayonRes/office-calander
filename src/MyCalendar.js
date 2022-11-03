import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Holidays from "./Holidays";
import AttendanceSummary from "./AttendanceSummary";
import Events from "./Events";
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
import Test from "./Test";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";

import { useSnackbar } from "notistack";
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
    maxWidth: "none",
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
    background: "#1dd1a1",
    // background: "black",
    color: "white",
    margin: "0 0 10px 0",
    padding: "3px 0",
    position: "relative",
    borderRadius: "0px 15px",
  },
  monthNoStyle: {
    // background: weaklyHolidaysColor,
    background: "#35af8e",
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
    marginBottom: "5px",
    "& td": {
      padding: "7px !important",
      fontSize: "12px",
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
function MyCalendar() {
  // console.log("Holidays", Holidays);
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = React.useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [active, setActive] = useState("Govt. Holidays");
  const [newAttendanceSummary, setNewAttendanceSummary] =
    useState(AttendanceSummary);
  const [newHolidays, setNewHolidays] = useState(Holidays);
  const [officeEvent, setOfficeEvent] = useState(Events);
  const [userDays, setUserDays] = useState(Holidays);
  const [editYear, setEditYear] = useState(false);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [type, setType] = React.useState("");
  const [title, setTitle] = useState("");
  const [checkIn, setCheckIn] = useState(dayjs("2014-08-18T9:00:00"));
  const [checkOut, setCheckOut] = useState(dayjs("2014-08-18T19:00:00"));
  const [userCheckIn, setUserCheckIn] = useState(
    dayjs("2014-08-18T9:00:00").format("HH:mm")
  );
  const [userCheckOut, setUserCheckOut] = useState(
    dayjs("2014-08-18T19:00:00").format("HH:mm")
  );
  const [description, setDescription] = useState("");
  const [selectDateData, setSelectDateData] = useState({});

  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };
  const handleCheckInChange = (newValue) => {
    setUserCheckIn(dayjs(newValue).format("HH:mm"));
    setCheckIn(newValue);
  };
  const handleCheckOutChange = (newValue) => {
    setUserCheckOut(dayjs(newValue).format("HH:mm"));
    setCheckOut(newValue);
  };
  const addEvents = () => {
    let obj = newAttendanceSummary.find((o) => o.date === selectDateData.date);
    console.log("obj", obj);
    console.log("selectDateData", selectDateData);
    switch (type) {
      case "Govt. Holidays":
        newHolidays.push({
          date: selectDateData.date,
          monthName: selectDateData.monthName,
          day: selectDateData.day,
          description: description,
        });
        break;
      case "Present":
        if (obj?.date?.length > 0) {
          newAttendanceSummary.map((e, i) => {
            if (e.date === obj.date) {
              e.checkIn = userCheckIn;
              e.checkOut = userCheckOut;
              e.type = type;
              e.description = "";
            }
          });
        } else {
          newAttendanceSummary.push({
            date: selectDateData.date,
            monthName: selectDateData.monthName,
            day: selectDateData.day,
            year: currentYear,
            checkIn: userCheckIn,
            checkOut: userCheckOut,
            type: type,
            description: description,
          });
        }
        changeMenu("Present");
        break;
      case "Casual Leave":
        if (obj?.date?.length > 0) {
          newAttendanceSummary.map((e, i) => {
            if (e.date === obj.date) {
              e.checkIn = "";
              e.checkOut = "";
              e.type = type;
              e.description = "";
            }
          });
        } else {
          newAttendanceSummary.push({
            date: selectDateData.date,
            monthName: selectDateData.monthName,
            day: selectDateData.day,
            year: currentYear,
            checkIn: "",
            checkOut: "",
            type: type,
            description: type,
          });
        }
        changeMenu("Casual Leaves");
        break;

      case "Medical Leave":
        if (obj?.date?.length > 0) {
          newAttendanceSummary.map((e, i) => {
            if (e.date === obj.date) {
              e.checkIn = "";
              e.checkOut = "";
              e.type = type;
              e.description = "";
            }
          });
        } else {
          newAttendanceSummary.push({
            date: selectDateData.date,
            monthName: selectDateData.monthName,
            day: selectDateData.day,
            year: currentYear,
            checkIn: "",
            checkOut: "",
            type: type,
            description: type,
          });
        }
        changeMenu("Medical Leaves");
        break;

      case "Annual Leave":
        if (obj?.date?.length > 0) {
          newAttendanceSummary.map((e, i) => {
            if (e.date === obj.date) {
              e.checkIn = "";
              e.checkOut = "";
              e.type = type;
              e.description = "";
            }
          });
        } else {
          newAttendanceSummary.push({
            date: selectDateData.date,
            monthName: selectDateData.monthName,
            day: selectDateData.day,
            year: currentYear,
            checkIn: "",
            checkOut: "",
            type: type,
            description: type,
          });
        }
        changeMenu("Annual Leaves");
        break;

      case "Events":
        officeEvent.push({
          date: selectDateData.date,
          monthName: selectDateData.monthName,
          day: selectDateData.day,
          title: title,
          description: description,
        });
        changeMenu("Events");
        break;

      default:
        break;
    }
    handleClose();
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const totalCasualLeave = 10;
  const totalMediacalLeave = 10;
  const totalAnnualLeave = 20;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      setUserDays(newHolidays);
    } else if (id === "Present") {
      setUserDays(
        newAttendanceSummary.filter((item) => item.type === "Present")
      );
    } else if (id === "Casual Leaves") {
      setUserDays(
        newAttendanceSummary.filter((item) => item.type === "Casual Leave")
      );
    } else if (id === "Medical Leaves") {
      setUserDays(
        newAttendanceSummary.filter((item) => item.type === "Medical Leave")
      );
    } else if (id === "Annual Leaves") {
      setUserDays(
        newAttendanceSummary.filter((item) => item.type === "Annual Leave")
      );
    }
    setActive(id);
    // console.log("id", id);
  };
  const getFirstdayOfTheYear = () => {
    // console.log("current year", new Date().getFullYear());
    let year = currentYear;
    // setCurrentYear(year);
    const isLeapYear = year % 4;
    // console.log("isLeapYear", isLeapYear);
    if (isLeapYear === 0) {
      months[1].days = 29;
    }
    let firstDay = new Date(year, 0, 1);

    // console.log("firstDay", firstDay.getDay());
    return firstDay.getDay();
  };
  useEffect(() => {
    let firstdayNo = getFirstdayOfTheYear();

    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      new Date().getDay()
    ];
  }, []);
  const handleSelectedDate = (date) => {
    console.log("active", active);
    let newDay = date.day;
    if (parseInt(date.day) < 10) {
      newDay = `0${newDay}`;
    }
    let data = {
      date: `${newDay}-${date.month.monthNo}-${currentYear}`,
      monthName: date.month.name,
      day: date.day,
    };
    setSelectDateData(data);

    let obj = newAttendanceSummary.find((o) => o.date === data.date);
    switch (active) {
      case "Casual Leaves":
        console.log("parseInt(calculateCasualLeaves()",parseInt(calculateCasualLeaves()))
       
          if (obj?.type?.length > 0) {
            if (obj?.type === "Casual Leave") {
              handleClickOpen();
            } else {
              newAttendanceSummary.map((e, i) => {
                if (e.date === obj.date) {
                  e.checkIn = "";
                  e.checkOut = "";
                  e.type = "Casual Leave";
                  e.description = "Casual Leave";
                }
              });
            }
          } else {
            if (parseInt(calculateCasualLeaves()) > 0) {
            newAttendanceSummary.push({
              date: data.date,
              monthName: data.monthName,
              day: data.day,
              year: currentYear,
              checkIn: "",
              checkOut: "",
              type: "Casual Leave",
              description: "Casual Leave",
            });
          }
          else {
            handleSnakbarOpen("Your casual leave is over", "error");
          }
        }

        changeMenu("Casual Leaves");
        break;
      case "Medical Leaves":
        if (obj?.type?.length > 0) {
          if (obj?.type === "Medical Leave") {
            handleClickOpen();
          } else {
            newAttendanceSummary.map((e, i) => {
              if (e.date === obj.date) {
                e.checkIn = "";
                e.checkOut = "";
                e.type = "Medical Leave";
                e.description = "Medical Leave";
              }
            });
          }
        } else {
          newAttendanceSummary.push({
            date: data.date,
            monthName: data.monthName,
            day: data.day,
            year: currentYear,
            checkIn: "",
            checkOut: "",
            type: "Medical Leave",
            description: "Medical Leave",
          });
        }
        changeMenu("Medical Leaves");
        break;
      case "Annual Leaves":
        if (obj?.type?.length > 0) {
          if (obj?.type === "Annual Leave") {
            handleClickOpen();
          } else {
            newAttendanceSummary.map((e, i) => {
              if (e.date === obj.date) {
                e.checkIn = "";
                e.checkOut = "";
                e.type = "Annual Leave";
                e.description = "Annual Leave";
              }
            });
          }
        } else {
          newAttendanceSummary.push({
            date: data.date,
            monthName: data.monthName,
            day: data.day,
            year: currentYear,
            checkIn: "",
            checkOut: "",
            type: "Annual Leave",
            description: "Annual Leave",
          });
        }
        changeMenu("Annual Leaves");
        break;

      default:
        handleClickOpen();
        break;
    }
    console.log("date", date);
  };
  const calculateCasualLeaves = () => {
    let remain =
      totalCasualLeave -
      newAttendanceSummary.filter((item) => item.type === "Casual Leave")
        .length;
    if (remain < 10) {
      return `0${remain}`;
    }
    return remain;
  };
  const calculateMedicalLeaves = () => {
    let remain =
      totalMediacalLeave -
      newAttendanceSummary.filter((item) => item.type === "Medical Leave")
        .length;
    if (remain < 10) {
      return `0${remain}`;
    }
    return remain;
  };
  const calculateAnnualLeaves = () => {
    let remain =
      totalAnnualLeave -
      newAttendanceSummary.filter((item) => item.type === "Annual Leave")
        .length;

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
          <div
            style={{
              background: holidayObj.length > 0 ? "#dfdfdf" : "",
              borderRadius: "4px",
              margin: "auto",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() =>
              handleSelectedDate({ day: index - skipNo + 1, month: month })
            }
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
          cursor: "pointer",
        }}
        onClick={() =>
          handleSelectedDate({ day: index - skipNo + 1, month: month })
        }
      >
        {skipNo <= index && index - skipNo < month?.days && index - skipNo + 1}
      </div>
    );
  };
  // const handleSelectedDate = (date) => {
  //   console.log("date", date);

  // };

  let skipNo = 0;
  const fnCheckTimes = (obj) => {
    // console.log("obj", obj);
    let result = "00:00";
    if (obj?.type === "Present") {
      let isLate = false;
      let isCompletedWorkingHours = false;
      let checkOut = obj?.checkOut;
      let checkIn = obj?.checkIn;
      let newCheckOut = checkOut.split(":");
      // console.log("newCheckOut", newCheckOut);
      let newCheckIn = checkIn.split(":");
      // console.log("newCheckIn", newCheckIn);
      let checkInTime = `${checkIn} AM`;
      let checkOutTime = `${checkOut} AM`;

      if (parseInt(newCheckIn[0]) > 11) {
        let newHour = parseInt(newCheckIn[0]) - 12;

        checkInTime = `${newHour}:${parseInt(newCheckIn[1])} PM`;
      }
      if (parseInt(newCheckOut[0]) > 11) {
        let newHour = parseInt(newCheckOut[0]) - 12;
        let newMin = parseInt(newCheckOut[1]);
        if (parseInt(newHour) < 10) {
          newHour = `0${newHour}`;
        }
        if (parseInt(newMin) < 10) {
          newMin = `0${newMin}`;
        }
        checkOutTime = `${newHour}:${newMin} PM`;
      }

      let minDiff = parseInt(newCheckOut[1]) - parseInt(newCheckIn[1]);
      let hourDiff = parseInt(newCheckOut[0]) - parseInt(newCheckIn[0]);
      // console.log("minDiff", minDiff);
      // console.log("hourDiff", hourDiff);

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
      let minDeficiency = 30 - minDiff;
      let hourDeficiency = 8 - hourDiff;
      if (minDiff > 30) {
        minDeficiency = 30 + 60 - minDiff;
        hourDeficiency = 8 - 1 - hourDiff;

        // {8-parseInt(hourDiff)}:{minDiff} hrs
      } else {
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
          <Grid
            container
            justifyContent="space-between"
            // style={{ marginTop: 5 }}
          >
            <p
              style={{
                textAlign: "center",
                margin: "8px 8px 0",
                color: "#717D7E",
              }}
            >
              Total working : 8:30 hours
            </p>
            {/* <p
              style={{
                textAlign: "center",
                margin: "8px 8px 0",
                color: "#717D7E",
              }}
            >
              {moment(obj?.date, "DD-MM-YYYY").format("DD MMMM, YYYY")}
            </p> */}
          </Grid>

          <Table
            aria-label="simple table"
            className={classes.summeryTableStyle}
          >
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" style={{ color: "#717D7E" }}>
                  Check-In (Last punch time :- 10:30 AM)
                </TableCell>
                <TableCell align="left">
                  <button
                    disabled
                    className={
                      isLate
                        ? classes.errorButtonStyle
                        : classes.successButtonStyle
                    }
                  >
                    {checkInTime}
                    {/* {obj?.checkIn > 12
                      ? `${obj?.checkIn} AM`
                      : `${obj?.checkIn - 12} PM`} */}
                  </button>
                </TableCell>
                <TableCell align="left" style={{ color: "#717D7E" }}>
                  Check-Out{" "}
                </TableCell>
                <TableCell align="left" style={{ position: "relative" }}>
                  {" "}
                  <button
                    disabled
                    className={
                      isCompletedWorkingHours
                        ? classes.successButtonStyle
                        : classes.errorButtonStyle
                    }
                  >
                    {checkOutTime}
                    {/* {isCompletedWorkingHours ? "Complete" : "Not Complete"} */}
                  </button>
                  {!isCompletedWorkingHours && (
                    <>
                      <p
                        style={{
                          position: "absolute",
                          color: "#ee5253",
                          margin: 0,
                        }}
                      >
                        Deficiency : {hourDeficiency}:{minDeficiency} hrs
                      </p>
                    </>
                  )}
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
      {/* <br />
      <Test /> */}
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
                    // console.log("newValue", dayjs(newValue).format("YYYY"));
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
                  <p className={classes.holidayCardDays}>
                    {newHolidays.length}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div
                  className={`${classes.holidayCard} ${
                    active === "Present" && classes.activeStyle
                  }`}
                  onClick={() => changeMenu("Present")}
                >
                  <p className={classes.holidayCardTitle}>
                    {" "}
                    Attendance Summary
                  </p>
                  <p className={classes.holidayCardDays}>
                    {newAttendanceSummary.length}
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
                  {officeEvent?.map((item, i) => (
                    <Accordion
                      key={i}
                      expanded={expanded === i}
                      onChange={handleChange(i)}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <Typography>{item?.title}</Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 500,
                            position: "absolute",
                            bottom: -3,
                          }}
                        >
                          {moment(item?.date, "DD-MM-YYYY").format(
                            "DD MMM, YYYY"
                          )}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body2"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          {item?.description}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
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
                                // cursor: "pointer",
                              }}
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
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        {/* <DialogTitle id="alert-dialog-title" style={{ position: "relative" }}>
          {"Use Google's location service?"}
        
        </DialogTitle> */}
        <DialogContent>
          <div style={{ position: "relative", padding: "15px" }}>
            <IconButton
              aria-label=""
              style={{ position: "absolute", right: 0, top: -12 }}
              onClick={handleClose}
            >
              <ClearIcon />
            </IconButton>
          </div>

          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // variant="standard"
                value={type}
                label="Type"
                onChange={handleTypeChange}
              >
                <MenuItem value="Events">Event</MenuItem>
                <MenuItem value="Govt. Holidays">Govt. Holidays</MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                <MenuItem value="Medical Leave">Medical Leave</MenuItem>
                <MenuItem value="Annual Leave">Annual Leave</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
          {/* {active !== "Govt. Holidays" && ( */}
          <>
            <TextField
              fullWidth
              id="standard-basic"
              label="Title"
              // variant="standard"

              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
          </>
          {/* )} */}

          {/* {active === "Present" && ( */}
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Check-In"
                value={checkIn}
                onChange={handleCheckInChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
              <br />
              <br />
              <TimePicker
                label="Check-Out"
                value={checkOut}
                onChange={handleCheckOutChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
            <br />
            <br />
          </>
          {/* )} */}
          {/* <DateRangePicker
            onChange={(item) => {
              console.log("item", item.selection);
              console.log("my data", {
                checkData: dayjs(item.selection.startDate).format("DD-MM-YYYY"),
                date: "06-03-2022",
                monthName: "March",
                day: 6,
                year: "2022",
                checkIn: "",
                checkOut: "",
                type: "Medical Leave",
                description: "Medical Leave",
              });
              setState([item.selection]);
            }}
            editableDateInputs={true}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          /> */}

          <TextField
            fullWidth
            id="standard-basic"
            label="Description"
            // variant="standard"
            multiline
            rows={3}
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <Button
            onClick={addEvents}
            fullWidth
            variant="contained"
            disableElevation
          >
            Submit
          </Button>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          {/* <Button onClick={handleClose} fullWidth autoFocus variant="contained">
            Submit
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyCalendar;
