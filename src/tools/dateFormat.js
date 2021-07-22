const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

function dateFormat(date) {
    let time_delta = Date.now() - date;
    if (time_delta < SECOND * 2) {
        return "1 second ago";
    } else if (time_delta < MINUTE) {
        return `${Math.trunc(time_delta / SECOND)} seconds ago`;
    } else if (time_delta < MINUTE * 2) {
        return "1 minute ago";
    } else if (time_delta < HOUR) {
        return `${Math.trunc(time_delta / MINUTE)} minutes ago`;
    } else if (time_delta < HOUR * 2) {
        return "1 hour ago";
    } else if (time_delta < DAY) {
        return `${Math.trunc(time_delta / HOUR)} hours ago`;
    } else if (time_delta < DAY * 2) {
        return "1 day ago";
    } else if (time_delta < WEEK) {
        return `${Math.trunc(time_delta / DAY)} days ago`;
    } else if (time_delta < WEEK * 2) {
        return "1 week ago";
    } else if (time_delta < MONTH) {
        return `${Math.trunc(time_delta / WEEK)} weeks ago`;
    } else if (time_delta < MONTH * 2) {
        return "1 month ago";
    } else if (time_delta < YEAR) {
        return `${Math.trunc(time_delta / MONTH)} months ago`;
    } else if (time_delta < YEAR * 2) {
        return "1 year ago";
    }
    return `${Math.trunc(time_delta / YEAR)} years ago`;
}

export default dateFormat;
