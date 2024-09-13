const padToTwoDigits = (num: number) => num.toString().padStart(2, '0');

export const GetFrenchLocalTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = padToTwoDigits(now.getMonth() + 1);
  const day = padToTwoDigits(now.getDate());
  const hours = padToTwoDigits(now.getHours());
  const minutes = padToTwoDigits(now.getMinutes());
  const seconds = padToTwoDigits(now.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};