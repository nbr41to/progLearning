/* 今日から過去n週間分の日付を配列で取得 */
export const getPastDays = () => {
  const today = new Date();
  /* 今日の曜日を取得 */
  const todayWeek = today.getDay();

  const dateArray = [];
  const days = 7 * 15 + 1; // 7n+1（日） = 106
  for (let i = 0; i < days + todayWeek; i += 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dateArray.push(date);
  }

  return dateArray;
};
