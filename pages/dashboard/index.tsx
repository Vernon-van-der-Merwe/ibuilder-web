import { TableScrollArea, TableScrollAreaProps } from "../../src/components/TableScrollArea";
import { Button, Center, Container, Code, Text, Grid } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDebouncedState } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons";
import router from "next/router";
import { useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const headers = [
  'Payment Date',
  'Type',
  'Was Date Adjusted',
  'Date Before Adjustment'
]

export function monthList(From, To) {
  let list = [];
  for (let d = new Date(From); d <= To; d.setMonth(d.getMonth() + 1)) {
    list.push(new Date(d));
  }
  return list;
}

export function isWeekend(input) {
  const date = new Date(input);
  return date.getDay() == 6 || date.getDay() == 0 ? true : false;
}

export function getNextWednesday(input) {
  const newDate = new Date(input);
  const day = input.getDay();

  if (day == 6) {
    newDate.setDate(newDate.getDate() + 4);
  } else {
    newDate.setDate(newDate.getDate() + 3);
  }

  return newDate;
}

export function addOneYear(date) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
}

export function getPreviousFriday(input) {
  const newDate = new Date(input);
  const day = input.getDay();
  const diff = input.getDate() - day + (day == 0 ? -2 : 5);
  const result = new Date(newDate.setDate(diff))
  return result;
}

export function asSalaryData(
  date: Date,
  adjusted: true | false,
  type: "salary" | "bonus",
  oldDate?: Date) {
  if (oldDate && adjusted) {
    return { date: date.toDateString(), type, wasAdjusted: adjusted.toString(), oldDate: oldDate.toDateString() };
  } else {
    return { date: date.toDateString(), type, wasAdjusted: adjusted.toString() }
  };
}

export function asCsvData(data) {
  return data.map((row) => {
    return [row.date, row.type, row.wasAdjusted, row.oldDate ? row.oldDate : ""];
  });
}

// calculate whether the 15th lands on a weekend
// if so change the date to the next wednesday
// else keep the date the same
// return the date as a SalaryData object
export function calculateBonusDate(date) {
  const fifteenthDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 15);

  return isWeekend(fifteenthDayOfMonth) ?
    asSalaryData(getNextWednesday(date), true, "bonus", fifteenthDayOfMonth) :
    asSalaryData(fifteenthDayOfMonth, false, "bonus");
}

// then calculate whether the end of the month lands on a weekend
// if so change the date to the previous friday
// else keep the date the same
// return the date as a SalaryData object
export function calculateSalaryDate(date) {
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return isWeekend(lastDayOfMonth) ?
    asSalaryData(getPreviousFriday(date), true, "salary", lastDayOfMonth) :
    asSalaryData(lastDayOfMonth, false, "salary");
}

export function calculateSalary(d) {
  const bonus = calculateBonusDate(d)
  const salary = calculateSalaryDate(d)
  return [
    bonus,
    salary
  ]
}

export function calculateSalaries(From, To) {
  let dates = monthList(From, To);
  let salaries = []

  dates.forEach((d) => {
    salaries.push(...calculateSalary(d))
  });

  return { salaries };
}

export function Landing({ Component, pageProps }) {
  const now = new Date();
  const [salary, setSalary] = useDebouncedState([], 200);
  const [FromValue, FromOnChange] = useState(now);
  const newDate = addOneYear(now);
  const [ToValue, ToOnChange] = useState(newDate);

  return (
    <>
      <Center pt={'80px'} pb={'10px'}>
        <h1>Which dates would you like to calculate your salary dates for?</h1>
      </Center>
      <Center>
        <DatePicker
          placeholder="Date From"
          icon={<IconCalendar size={16} />}
          pr={'10px'}
          value={FromValue}
          onChange={FromOnChange}
        />
        <DatePicker
          placeholder="Date To"
          icon={<IconCalendar size={16} />}
          value={ToValue}
          onChange={ToOnChange}
        />
      </Center>
      <Center pt={'10px'}>
        <Button onClick={
          () => {
            let { salaries } = calculateSalaries(FromValue, ToValue);
            setSalary(salaries)
          }
        }>
          Calculate
        </Button>
      </Center>
      <Center pt={'10px'}>
        <h1>Payment Dates</h1>
      </Center>
      <Center>
        <CSVLink
          data={asCsvData(salary)}
          filename={`${FromValue.toDateString()}-${ToValue.toDateString()}.csv`}
          headers={headers}>Download me</CSVLink>;
      </Center>
      <Center>
        Salaries
      </Center>
      <Center>
        <TableScrollArea data={salary}></TableScrollArea>
      </Center>
    </>
  );
}

export default Landing;
