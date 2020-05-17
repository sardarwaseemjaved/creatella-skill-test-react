export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// today, yesterday, 2 days ago, 3 days ago...
export function calculateDaysAgo(dateStr, dateStr2 = new Date()) {
    var today = dateStr2;
    var createdOn = new Date(dateStr);
    var msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    var diff = (+today - +createdOn) / msInDay;
    return diff <= 0
        ? "Today"
        : diff == 1
            ? "Yesterday"
            : diff + " " + "days ago";
}
// 04 Feb 20
export const date_to_dd_Mon_yr = inputDate => {
    if (!inputDate) {
        return undefined;
    }
    inputDate = inputDate.substr(0, 10);
    const date = new Date(inputDate);
    if (date.toString() == "Invalid Date") {
        return undefined;
    }
    const dateOfMonth =
        date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const month = MONTH_NAMES[date.getMonth()].substr(0, 3);
    const year = date
        .getFullYear()
        .toString()
        .substr(-2);
    return dateOfMonth + " " + month + " " + year;
};