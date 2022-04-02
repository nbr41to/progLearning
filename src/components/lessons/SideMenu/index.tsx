import clsx from "clsx";
import { useRouter } from "next/router";
import { useMemo, useState, VFC } from "react";
import { useCategories } from "src/swr/hooks/useCategories";
import { useSections } from "src/swr/hooks/useSections";

type Props = {
  tableOgContents?: {
    id: string;
    text: string;
  }[];
};

export const SideMenu: VFC<Props> = ({ tableOgContents = [] }) => {
  const router = useRouter();
  const { sections } = useSections();
  const { categories } = useCategories();

  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const toggleOpen = (categoryId: string) => {
    const open = openCategories.includes(categoryId);
    if (open) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    }
    if (!open) {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  const isSectionPage = useMemo(
    () => router.pathname.startsWith("/lessons/"),
    [router.pathname]
  );

  return (
    <div className="fixed w-40">
      <h2
        className="w-fit cursor-pointer text-xl font-bold underline"
        onClick={() => router.push("/lessons")}
      >
        Lessons
      </h2>
      {isSectionPage && (
        <div>
          <p>目次</p>
          <div className="flex flex-col gap-2">
            {tableOgContents.map((content) => (
              <a key={content.id} className="text-sm" href={`#${content.id}`}>
                {content.text}
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 w-40 divide-y border">
        {categories.map((category) => (
          <div key={category.id}>
            <div
              className="cursor-pointer p-2 transition-colors hover:text-secondary2"
              onClick={() => toggleOpen(category.id)}
            >
              <h3 className="font-bold">{category.name}</h3>
            </div>
            <div
              className={clsx(
                openCategories.includes(category.id) ? "block" : "hidden"
              )}
            >
              {sections
                .filter(
                  (section) =>
                    section.properties.category.select.id === category.id
                )
                .map((section) => (
                  <div
                    key={section.id}
                    className="ml-2 cursor-pointer rounded p-2 transition hover:bg-primary1/10 hover:underline"
                    onClick={() => router.push(`lessons/${section.id}`)}
                  >
                    <h4 className="text-sm">
                      {section.properties.title.title[0]?.plain_text}
                    </h4>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
