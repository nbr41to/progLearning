import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.INTERNAL_INTEGRATION_TOKEN,
});
const lessonDatabaseId = process.env.LESSON_DATABASE_ID || '';
const appDatabaseId = process.env.APP_DATABASE_ID || '';

/**
 * データは最小限にして返す
 */

/* DBからCategoryのリストを取得 */
export const getCategories = async () => {
  const database = await notion.databases.retrieve({
    database_id: lessonDatabaseId,
  });
  const categoryProperty = database.properties.category;
  if (categoryProperty.type !== 'select') return [];

  return categoryProperty.select.options;
};

/* DBからCategoryのリストを取得 */
export const getCategoriesWithDescription = async () => {
  /* DB情報を取得 */
  const database = await notion.databases.retrieve({
    database_id: lessonDatabaseId,
  });
  const categoryProperty = database.properties.category;
  if (categoryProperty.type !== 'select') return;
  const categories = categoryProperty.select.options;

  /* カテゴリのOverviewをそれぞれ取得 */
  const categoryOverviews = await notion.databases.query({
    database_id: lessonDatabaseId,
    filter: {
      property: 'serial',
      number: {
        equals: 0,
      },
    },
  });
  const serial0Pages = categoryOverviews.results;

  console.log('serial0Pages', serial0Pages);
  if (!('properties' in serial0Pages[0])) return;

  /* カテゴリーにDescriptionを追加 */
  const lessons = categories.map((category) => {
    /* カテゴリの概要を見つける */
    const overview = serial0Pages.find((serial0Page) => {
      if (!('properties' in serial0Page)) return;
      const property = serial0Page?.properties;
      if (property.category.type !== 'select') return;
      return property.category.select?.id === category.id;
    });

    /* 型ガード */
    if (overview && !('properties' in overview)) return;
    if (overview?.properties.overview.type !== 'rich_text') return;

    return {
      id: category.id,
      name: category.name,
      color: category.color,
      description: overview?.properties.overview.rich_text[0].plain_text || '',
    };
  });

  return lessons;
};

/* DBからCourseのリストを取得 */
export const getCourses = async () => {
  /* DB情報を取得 */
  const database = await notion.databases.retrieve({
    database_id: lessonDatabaseId,
  });
  const courseProperty = database.properties.course;

  /* 型ガード */
  if (courseProperty.type !== 'select') return;

  return courseProperty.select.options;
};

/* IDからSectionリストを取得 */
export const getSections = async (category: string) => {
  const sections = await notion.databases.query({
    database_id: lessonDatabaseId,
    filter: {
      property: 'category',
      select: {
        equals: category,
      },
    },
  });

  return sections.results;
};
