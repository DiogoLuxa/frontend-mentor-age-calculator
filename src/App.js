// components
import FormDate from "./components/FormDate";
import Content from "./components/Content";

// css
import "./App.css";

// state
import { useState } from "react";

function App() {
  // states
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [error, setError] = useState({
    day: { state: false, message: "" },
    month: { state: false, message: "" },
    year: { state: false, message: "" },
  });

  const [content, setContent] = useState({
    years: "- -",
    months: "- -",
    days: "- -",
  });

  // functions
  function handleChange(event) {
    const { name, value } = event.target;
    setDate((prevDate) => {
      return {
        ...prevDate,
        [name]: value,
      };
    });
  }

  function checkDay(day) {
    if (day === "") {
      setError((prevError) => {
        return {
          ...prevError,
          day: { state: true, message: "This field is required" },
        };
      });
    } else if (day < 1 || day > 31) {
      setError((prevError) => {
        return {
          ...prevError,
          day: { state: true, message: "Must be a valid day" },
        };
      });
    } else {
      setError((prevError) => {
        return {
          ...prevError,
          day: { state: false, message: "" },
        };
      });
    }
  }

  function checkMonth(month) {
    if (month === "") {
      setError((prevError) => {
        return {
          ...prevError,
          month: { state: true, message: "This field is required" },
        };
      });
    } else if (month < 1 || month > 12) {
      setError((prevError) => {
        return {
          ...prevError,
          month: { state: true, message: "Must be a valid month" },
        };
      });
    } else {
      setError((prevError) => {
        return {
          ...prevError,
          month: { state: false, message: "" },
        };
      });
    }
  }

  function checkYear(year) {
    if (year === "") {
      setError((prevError) => {
        return {
          ...prevError,
          year: { state: true, message: "This field is required" },
        };
      });
    } else if (year > 2024) {
      setError((prevError) => {
        return {
          ...prevError,
          year: { state: true, message: "Must be in the past" },
        };
      });
    } else {
      setError((prevError) => {
        return {
          ...prevError,
          year: { state: false, message: "" },
        };
      });
    }
  }

  function daysInMonth(day, month, year) {
    if (day !== "" && month !== "" && year !== "") {
      const totalDays = new Date(year, month, 0).getDate();
      if (day > totalDays) {
        setError((prevError) => {
          return {
            ...prevError,
            day: { state: true, message: "Must be a valid date" },
          };
        });
      } else {
        calculateDate(day, month, year);
      }
    }
  }

  function calculateDate(day, month, year) {
    const dayInt = parseInt(day);
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // We add 1 because months are indexed from 0 to 11
    const currentDay = currentDate.getDate();

    if (yearInt > currentYear) {
      setError((prevError) => {
        return {
          ...prevError,
          year: { state: true, message: "Must be in the past" },
        };
      });
    } else if (yearInt === currentYear && monthInt > currentMonth) {
      setError((prevError) => {
        return {
          ...prevError,
          month: { state: true, message: "Must be in the past" },
        };
      });
    } else if (
      yearInt === currentYear &&
      monthInt === currentMonth &&
      dayInt > currentDay
    ) {
      setError((prevError) => {
        return {
          ...prevError,
          day: { state: true, message: "Must be in the past" },
        };
      });
    } else if (yearInt === 0 || monthInt === 0 || dayInt === 0) {
      setError((prevError) => {
        return {
          ...prevError,
          year: { state: true, message: "Must be a valid date" },
          month: { state: true, message: "Must be a valid date" },
          day: { state: true, message: "Must be a valid date" },
        };
      });
    } else {
      let years = currentYear - yearInt;
      let months = currentMonth - monthInt;
      let days = currentDay - dayInt;

      // Check if we need to adjust the differences
      if (months < 0 || (months === 0 && days < 0)) {
        years--; // Not yet a year old
        months += 12; // We added 12 months to compensate
      }
      if (days < 0) {
        months--; // Not even a month old yet
        const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate(); // Last day of the previous month
        days += lastDayOfLastMonth; // We add the number of days from the previous month
      }

      setContent({
        years,
        months,
        days,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { day, month, year } = date;

    checkDay(day);
    checkMonth(month);
    checkYear(year);
    daysInMonth(day, month, year);
  }

  // return
  return (
    <div className="container">
      <div className="container__content">
        <FormDate
          date={date}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Content content={content} />
      </div>
    </div>
  );
}

export default App;
