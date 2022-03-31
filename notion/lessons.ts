import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.INTERNAL_INTEGRATION_TOKEN,
});
const lessonDatabaseId = process.env.LESSON_DATABASE_ID || "";

/* データは最小限にして返す */

/**
 * DBからCategoryのリストを取得
 */
export const getCategories = async () => {
  const database = await notion.databases.retrieve({
    database_id: lessonDatabaseId,
  });
  const categoryProperty = database.properties.category;
  if (categoryProperty.type !== "select") return [];

  return categoryProperty.select.options;
};

/* DBからCourseのリストを取得 */
export const getCourses = async () => {
  /* DB情報を取得 */
  const database = await notion.databases.retrieve({
    database_id: lessonDatabaseId,
  });
  const courseProperty = database.properties.course;

  /* 型ガード */
  if (courseProperty.type !== "select") return;

  return courseProperty.select.options;
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
