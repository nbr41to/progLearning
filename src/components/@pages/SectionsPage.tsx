import { VFC } from "react";

type SectionsPageProps = {
  sections: any[];
};

export const SectionsPage: VFC<SectionsPageProps> = ({ sections }) => {
  console.log(sections);
  return (
    <div>
      <h1>Sections</h1>
      <div>教材一覧</div>
    </div>
  );
};
