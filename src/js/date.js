function addPadding(value) {
    return (value < 10)
        ? '0' + value
        : value;
}

export function formatDate() {
    const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        days = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        milliseconds = date.getMilliseconds();

    return `${year}-${addPadding(month)}-${addPadding(days)}-${hours}:${minutes}:${addPadding(seconds)}:${milliseconds}`;
}