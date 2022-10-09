/* JWTを発行してTokenを取得 */
export const getJwtToken = async (uid: string) => {
  const res = await fetch('/api/v1/auth/', {
    method: 'POST',
    body: JSON.stringify({ uid }),
  });
  const token = await res.json();

  return token;
};
