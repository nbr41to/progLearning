import { notion } from './client';

const objectDatabaseId = '4925d37d06e544598b1fcdf2e4a57bde';

export const getObjects = async () => {
  const response = await notion.databases.query({
    database_id: objectDatabaseId,
    filter: {
      property: 'id',
      formula: {
        text: {
          equals: 'd871c41d131047ffa8aeb187fbd018b0',
        },
      },
    },
  });

  return response.results[0];
};
