import axios from 'axios';

/* Pixelaのユーザを作成 */
export const createUser = async (uid: string) => {
  const response = await axios.post('https://pixe.la/v1/users', {
    token: uid,
    username: uid.toLocaleLowerCase(),
    agreeTermsOfService: 'yes',
    notMinor: 'yes',
  });

  return response.data;
};

/* ユーザの存在を確認 */
export const existingUser = async (uid: string) => {
  const response = await axios.get(
    `https://pixe.la/@${uid.toLocaleLowerCase()}`
  );

  return response;
};

/* グラフを作成 */
export const createGraph = async (uid: string) => {
  const response = await axios.post(
    `https://pixe.la/v1/users/${uid.toLocaleLowerCase()}/graphs`,
    {
      id: uid.toLocaleLowerCase().substring(0, 16),
      name: 'proglearning-graph',
      unit: 'commit',
      type: 'int',
      color: 'sora',
      timezone: 'Asia/Tokyo',
    },
    {
      headers: {
        'X-USER-TOKEN': uid,
      },
    }
  );

  return response.data;
};

/* グラフのcommitsを取得 */
export const getGraphCommits = async (uid: string) => {
  const response = await axios.get(
    `https://pixe.la/v1/users/${uid.toLocaleLowerCase()}/graphs/${uid
      .toLocaleLowerCase()
      .substring(0, 16)}`,
    {
      headers: {
        'X-USER-TOKEN': uid,
      },
    }
  );

  return response;
};

/* Increment */
export const incrementGraph = async (uid: string) => {
  const response = await axios.put(
    `https://pixe.la/v1/users/${uid.toLocaleLowerCase()}/graphs/${uid
      .toLocaleLowerCase()
      .substring(0, 16)}/increment`,
    {},
    {
      headers: {
        'X-USER-TOKEN': uid,
        'Content-Length': '0',
      },
    }
  );

  return response;
};

/* record commit */
export const recordCommit = async (uid: string | undefined) => {
  if (!uid) return;

  const resIncrement = await incrementGraph(uid);
  if (resIncrement.status === 200) return;

  const resUser = await existingUser(uid);
  const resGetGraph = await getGraphCommits(uid);

  if (resUser.status !== 200) {
    const resCreateUser = await createUser(uid);
    if (resCreateUser.status !== 200) return;
  }

  if (resGetGraph.status !== 200) {
    const resCreateGraph = await createGraph(uid);
    if (resCreateGraph.status !== 200) return;
  }

  await incrementGraph(uid);
};
