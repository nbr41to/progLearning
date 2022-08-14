export const createHeader = (uid: string) => {
  return {
    headers: {
      Authorization: `Bearer ${uid || ''}`,
    },
  };
};
