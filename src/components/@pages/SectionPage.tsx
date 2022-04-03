import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { useRouter } from "next/router";
import { useMemo, VFC } from "react";
import { useSections } from "src/swr/hooks/useSections";

import { Button } from "../@atoms/Button";
import { SideMenu } from "../lessons/SideMenu";
import { NotionBlock } from "../NotionBlockCompiler";

type SectionPageProps = {
  section: GetPageResponse & {
    children: ListBlockChildrenResponse["results"][number][];
  };
};

export const SectionPage: VFC<SectionPageProps> = ({ section }) => {
  const router = useRouter();
  const { sections } = useSections();

  const title =
    "properties" in section && section.properties.title.type === "title"
      ? section.properties.title.title[0]?.plain_text
      : "";
  const category =
    "properties" in section && section.properties.category.type === "select"
      ? section.properties.category.select?.name
      : "";

  console.log(sections);
  const currentIndex = sections.findIndex((item) => item.id === section.id);
  const prevSectionId = useMemo(() => {
    const prevSection = sections[currentIndex - 1];
    if (!prevSection) return null;
    if (prevSection.properties.category.select.name === category) {
      return prevSection.id;
    }
    return null;
  }, [category, currentIndex, sections]);

  const nextSectionId = useMemo(() => {
    console.log(sections);
    const nextSection = sections[currentIndex + 1];
    console.log(category);
    console.log(currentIndex + 1);
    console.log(nextSection);
    console.log(nextSection.properties.category.select.name);
    if (!nextSection) return null;
    if (nextSection.properties.category.select.name === category) {
      return nextSection.id;
    }
    return null;
  }, [category, currentIndex, sections]);

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

        <div className="flex justify-center gap-6">
          {prevSectionId !== null && (
            <Button onClick={() => router.push(`/lessons/${prevSectionId}`)}>
              前へ
            </Button>
          )}
          {nextSectionId !== null && (
            <Button onClick={() => router.push(`/lessons/${nextSectionId}`)}>
              次へ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
