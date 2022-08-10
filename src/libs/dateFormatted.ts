type InputDateFormatProps = {
  date?: Date | string;
  format?: string;
};

/**
 * 引数がなければ, 現在時刻を 'YYYY/MM/DD hh:mm:ss' のフォーマットで返す
 * @param params.date type: Date | string | undefined
 * @param params.format type: string('YYYY/MM/DD hh:mm:ss') | undefined
 * @returns type: string
 */
export const dateFormatted = (params?: InputDateFormatProps): string => {
  let date = params?.date ? params.date : new Date();
  const format = params?.format ? params.format : 'YYYY/MM/DD hh:mm';

  if (typeof date === 'string') {
    date = new Date(date);
  }
  let f = format;
  f = f.replace(/YYYY/, date.getFullYear().toString());
  f = f.replace(/MM/, `0${date.getMonth() + 1}`.slice(-2));
  f = f.replace(/DD/, `0${date.getDate()}`.slice(-2));
  f = f.replace(/hh/, `0${date.getHours()}`.slice(-2));
  f = f.replace(/mm/, `0${date.getMinutes()}`.slice(-2));

  return f;
};
