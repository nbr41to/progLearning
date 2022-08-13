/* 今日から過去104日の日付を配列で取得 */

export const getPastDays = () => {
  const today = new Date();
  /* 今日の曜日を取得 */
  const todayWeek = today.getDay();

  const days = [];
  for (let i = 0; i < 104 - todayWeek; i += 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(date);
  }

  return days;
};
