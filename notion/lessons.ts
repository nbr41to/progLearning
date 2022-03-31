import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.INTERNAL_INTEGRATION_TOKEN,
});
const lessonDatabaseId = process.env.LESSON_DATABASE_ID || '';

/* データは最小限にして返す */

/**
 * DBからCategoryのリストを取得
 */
export const getCategories = async () => {
  const database = await notion.databases.retrieve({
    database_id: lessonDatabaseId,
  });
  const categoryProperty = database.properties.category;
  if (categoryProperty.type !== 'select') return [];

  return categoryProperty.select.options;
};

/**
 * Section情報を全て取得
 */
export const getSections = async () => {
  const sections = [];
  const condition: {
    has_more: boolean;
    next_cursor: string | null | undefined;
  } = {
    has_more: true,
    next_cursor: undefined,
  };
  const page_size = 100; // 個ずつ取得

  /* next_cursorを使ってsectionを全て取得する */
  try {
    while (condition.has_more) {
      const response = await notion.databases.query({
        database_id: lessonDatabaseId,
        ...(condition.next_cursor && { start_cursor: condition.next_cursor }),
        page_size,
      });
      condition.has_more = response.has_more;
      condition.next_cursor = response.next_cursor;
      sections.push(...response.results);
    }

    return sections;
  } catch (error) {
    throw error;
  }
};

/**
 * IDからSection情報と内容取得
 */
export const getSectionContentById = async (sectionId: string) => {
  const section = await notion.pages.retrieve({ page_id: sectionId });
  const children = await notion.blocks.children.list({
    block_id: sectionId,
    page_size: 50,
  });

  return { ...section, section };
};
