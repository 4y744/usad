export const leftPad = (str: string, len: number, char: string) => {
    return Array(len - str.length).fill(char).join("") + str;
}