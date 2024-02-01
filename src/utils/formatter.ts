export const leftPad = (str: string, len: number, char: string) => {
    return Array(len - str.length).fill(char).join("") + str;
}

export const TimeFormatter = {
    HourMinuteSecondMillisecond: (timestamp: number) => {
        const date = new Date(timestamp);

        const time = `${
            leftPad(date.getHours().toString(), 2, "0") }:${
            leftPad(date.getMinutes().toString(), 2, "0")}:${
            leftPad(date.getSeconds().toString(), 2, "0")}.${
            leftPad(date.getMilliseconds().toString(), 4, "0")
        }`

        return time;
    },
    DayMonthYear: (timestamp: number) => {
        const date = new Date(timestamp);
        
        const time = `${
                leftPad(date.getDate().toString(), 2, "0") }/${
                leftPad((date.getMonth() + 1).toString(), 2, "0")}/${
                leftPad(date.getFullYear().toString(), 4, "0")}`

        return time;
    }
}