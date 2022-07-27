import { WebClient } from '@slack/web-api';

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;
// Initialize
const web = new WebClient(token);

export const getUsers = () => {
  return web.users.list();
};

export const getUserInfo = (id: string) => {
  return web.users.info({ user: id });
};

export const checkExistingEmail = async (email: string) => {
  const users = await web.users.list();
  const emailList =
    users.members
      ?.filter(
        (user) =>
          user.is_bot === false &&
          user.deleted === false &&
          user.is_email_confirmed === true
      )
      .map((user) => user.profile?.email) || [];

  return emailList.includes(email);
};
