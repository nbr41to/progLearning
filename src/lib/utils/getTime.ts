/* 秒数を時間に変換する */
export const ConvertSecondsToTime = (seconds: number): string => {
  const sec = `00${Math.floor((seconds / 1000) % 60)}`.slice(-2);
  const min = `00${Math.floor((seconds / 1000 / 60) % 60)}`.slice(-2);
  const hourStr = Math.floor((seconds / 1000 / 60 / 60) % 60).toString();
  const hour = hourStr.length === 1 ? `0${hourStr}` : hourStr;

  return `${hour}:${min}:${sec}`;
};
