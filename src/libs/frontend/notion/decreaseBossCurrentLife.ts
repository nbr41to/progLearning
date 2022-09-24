export const decreaseBossCurrentLife = async () => {
  await fetch('/api/v1/objects', {
    method: 'PATCH',
    body: JSON.stringify({
      hp: 1000,
    }),
  });
};
