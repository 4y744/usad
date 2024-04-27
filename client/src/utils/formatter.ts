//Import types
import { VoteType } from "../types";

/**
 * Increases length of string and fills empty space to the left with characters.
 * @param str Base string to modify.
 * @param len Desired length of the new string (needs to be bigger than `str.length`).
 * @param char Character to fill the empty space with.
 * @note hehe
 */
export const leftPad = (str: string, len: number, char: string) => {

    return Array(len - str.length).fill(char).join("") + str;

}

/**
 * Stores time formatting functions.
 */
export const TimeFormatter = {

    /**
     * Takes a unix timestamp and converts it to human-readable time (hh:mm:ss.msmsms).
     * @param timestamp Unix timestamp
     * @returns Formatted time
     */
    HourMinuteSecondMillisecond: (timestamp: number) => {

        try{

            const date = new Date(timestamp);

            const time = `${
                leftPad(date.getHours().toString(), 2, "0") }:${
                leftPad(date.getMinutes().toString(), 2, "0")}:${
                leftPad(date.getSeconds().toString(), 2, "0")}.${
                leftPad(date.getMilliseconds().toString(), 4, "0")}`;

            return time;

        }
        catch{

            return "error"
            
        }
    },
    /**
    * Takes a unix timestamp and converts it to human-readable time (DD/MM/YY).
    * @param timestamp Unix timestamp
    * @returns Formatted time
    */
    DayMonthYear: (timestamp: number) => {
        try{
            const date = new Date(timestamp);
        
            const time = `${leftPad(date.getDate().toString(), 2, "0")}/${
                leftPad((date.getMonth() + 1).toString(), 2, "0")}/${
                leftPad(date.getFullYear().toString(), 4, "0")}`;

            return time;
        }
        catch{
            return "error"
        }
    }
}

/**
 * Stores functions for formatting numbers.
 */
export const NumberFormatter = {

    Abbreviation: (num: number) => {

        const exp = Math.ceil(Math.abs(num).toString().length / 3) - 1;

        let suffix: string = "";

        switch(exp){
            case 0: 
                suffix =  "";
                break;

            case 1:
                suffix =  "K";
                break;

            case 2:
                suffix =  "M";
                break;

            case 3:
                suffix =  "G";
                break;
        }

        return `${Math.round(num / 1000 ** exp)}${suffix}`; 
    }
    
}