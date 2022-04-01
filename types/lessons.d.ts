type LessonCategory = {
  id: string;
  name: string;
  color: string;
};

type LessonSection = {
  id: string;
  properties: {
    title: {
      title: {
        plain_text: string;
      }[];
    };
    category: {
      select: LessonCategory;
    };
  };
};

type LessonSectionContent = LessonSection & {
  children: any[];
};
