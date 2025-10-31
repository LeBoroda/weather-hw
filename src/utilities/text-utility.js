export function getDateAsText(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getTimeAsText(date, useUTC = false) {
  let hours = useUTC ? date.getUTCHours() : date.getHours();
  let minutes = useUTC ? date.getUTCMinutes() : date.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes}`;
}
