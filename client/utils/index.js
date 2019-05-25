export const getDateStr = str => {
    const end = str.indexOf('T');
    const rawDate = str.slice(0, end);
    const firstHyphen = rawDate.indexOf('-');
    const lastHyphen = rawDate.lastIndexOf('-');
    const year = rawDate.slice(0, firstHyphen);
    const month = rawDate.slice(firstHyphen + 1, lastHyphen);
    const day = rawDate.slice(lastHyphen + 1);
    const monthStrArr = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const monthStr = monthStrArr[Number(month) - 1];
    return `${monthStr} ${day} ${year}`;
};
