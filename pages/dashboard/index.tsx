import { Button, Center, Container } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons";
import router from "next/router";
import { useState } from "react";

// function that takes in a date and returns a variable that added one year to the input date
function addOneYear(date) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
}

export function Landing({ Component, pageProps }) {
  const now = new Date();
  const [FromValue, FromOnChange] = useState(now);
  const newDate = addOneYear(now);
  const [ToValue, ToOnChange] = useState(newDate);

  return (
    <>
      <Container>
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
      </Container>
    </>
  );
}

export default Landing;
