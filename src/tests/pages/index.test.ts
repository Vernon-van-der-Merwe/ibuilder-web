import { addOneYear, calculateSalaries, getNextWednesday, getPreviousFriday, isLastDayOfMonthWeekend, monthDiff } from "../../../pages/dashboard";
import "@testing-library/jest-dom";

describe("Salary Dates Calculations", () => {
    test("addOneYear", () => {
        const date = new Date(1995, 11, 17);
        const expected = addOneYear(date);
        expect(expected).toStrictEqual(new Date(1996, 11, 17));
    });

    test("isLastDayOfMonthWeekend", () => {
        const dateThatReturnsTrue = isLastDayOfMonthWeekend(new Date(1995, 11, 31));
        const dateThatReturnsFalse = isLastDayOfMonthWeekend(new Date(1995, 10, 30));
        const expected = {
            dateThatReturnsTrue,
            dateThatReturnsFalse
        }
        expect(expected).toStrictEqual({
            dateThatReturnsTrue: true,
            dateThatReturnsFalse: false
        });
    });

    test("isLastDayOfMonthWeekend", () => {
        const dateThatReturnsTrue = isLastDayOfMonthWeekend(new Date(1995, 11, 31));
        const dateThatReturnsFalse = isLastDayOfMonthWeekend(new Date(1995, 10, 30));
        const expected = {
            dateThatReturnsTrue,
            dateThatReturnsFalse
        }
        expect(expected).toStrictEqual({
            dateThatReturnsTrue: true,
            dateThatReturnsFalse: false
        });
    });

    test("getNextWednesday", () => {
        const saturday = new Date(2023, 3, 15);
        const sunday = new Date(2023, 9, 15);

        const expectedNextWedSat = getNextWednesday(saturday);
        const expectedNextWedSun = getNextWednesday(sunday);

        const nextWedSat = new Date(2023, 3, 19);
        const nextWedSun = new Date(2023, 9, 18);

        expect({
            nextWedSat: expectedNextWedSat,
            nextWedSun: expectedNextWedSun
        }).toStrictEqual({
            nextWedSun,
            nextWedSat
        });
    });

    test("getFriday", () => {
        const saturday = new Date(2023, 8, 30);
        const sunday = new Date(2023, 3, 30);

        const expectedNextWedSat = getPreviousFriday(saturday);
        const expectedNextWedSun = getPreviousFriday(sunday);

        const prevFriSat = new Date(2023, 8, 29);
        const prevFriSun = new Date(2023, 3, 28);
        expect({
            prevFriSat: expectedNextWedSat,
            prevFriSun: expectedNextWedSun
        }).toStrictEqual({
            prevFriSat,
            prevFriSun
        });
    });

    test("calculateSalaries", () => {
        const saturday = new Date(2023, 1, 1);
        const oneyear = addOneYear(saturday);

        const expected= calculateSalaries(saturday, oneyear);

        const correctDates = []
        expect({
            expected
        }).toStrictEqual({
            correctDates
        });
    });

    test("monthDiff", () => {
        const start = new Date(2023, 6, 20);
        const AfterOneyear = addOneYear(start);

        const expected= monthDiff(start, AfterOneyear);

        expect({
            expected
        }).toStrictEqual({
            correctDates
        });
    });
});
