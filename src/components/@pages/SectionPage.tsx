import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { VFC } from "react";

import { SideMenu } from "../lessons/SideMenu";
import { NotionBlock } from "../NotionBlockCompiler";

type SectionPageProps = {
  section: GetPageResponse & {
    children: ListBlockChildrenResponse["results"][number][];
  };
};

export const SectionPage: VFC<SectionPageProps> = ({ section }) => {
  const title =
    "properties" in section && section.properties.title.type === "title"
      ? section.properties.title.title[0]?.plain_text
      : "";
  const h2Blocks = section.children
    .filter((block) => ("type" in block ? block.type === "heading_2" : false))
    .map((block) => ({
      id: block.id,
      text:
        "heading_2" in block
          ? block.heading_2.rich_text[0].plain_text
          : block.id,
    }));

  return (
    <div className="flex gap-10">
      <div className="min-w-[200px]">
        <SideMenu tableOgContents={h2Blocks} />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="space-y-2">
          {section.children.map((block) => (
            <div className="" key={block.id}>
              <NotionBlock block={block} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
