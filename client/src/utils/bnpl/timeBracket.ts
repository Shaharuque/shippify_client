import moment from "moment";
interface timeBracketDict {
  [key: string]: number;
}

const timeBracketDict: timeBracketDict = {
  "next-30": 30,
};

function getDatetime(timeBracket: string): string {
  if (timeBracketDict[timeBracket])
    return moment().add(timeBracketDict[timeBracket], "days").format();
  return moment().add(120, "days").format();
}

export { getDatetime };
