import { VFC } from "react";

import { SideMenu } from "../lessons/SideMenu";

type SectionPageProps = {
  // section: LessonSectionContent;
  section: any;
};

export const SectionPage: VFC<SectionPageProps> = ({ section }) => {
  // console.log(section);
  const title = section.properties.title.title[0]?.plain_text;
  return (
    <div className="flex gap-10">
      <SideMenu />
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div>{/* {section.children.map()} */}</div>
      </div>
    </div>
  );
};
