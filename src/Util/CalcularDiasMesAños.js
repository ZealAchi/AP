// export function dateDiff (dateFrom, dateTo) {
//     var diff = { TotalMs: dateTo - dateFrom };
//     diff.Days = Math.floor(diff.TotalMs / 86400000);

//     var remHrs = diff.TotalMs % 86400000;
//     var remMin = remHrs % 3600000;
//     var remS   = remMin % 60000;

//     diff.Hours        = Math.floor(remHrs / 3600000);
//     diff.Minutes      = Math.floor(remMin / 60000);
//     diff.Seconds      = Math.floor(remS   / 1000);
//     diff.Milliseconds = Math.floor(remS % 1000);
//     return diff;
// };
export function dateDiff(date) {
    date = date.split('-');
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var yy = parseInt(date[0]);
    var mm = parseInt(date[1]);
    var dd = parseInt(date[2]);
    var years, months, days;
    // months
    months = month - mm;
    if (day < dd) {
        months = months - 1;
    }
    // years
    years = year - yy;
    if (month * 100 + day < mm * 100 + dd) {
        years = years - 1;
        months = months + 12;
    }
    // days
    days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000));
    return {years: years, months: months, days: days};
}