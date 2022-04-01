import clsx from "clsx";
import { useRouter } from "next/router";
import { useState, VFC } from "react";
import { useCategories } from "src/swr/hooks/useCategories";
import { useSections } from "src/swr/hooks/useSections";

type Props = {};

export const SideMenu: VFC<Props> = () => {
  const router = useRouter();
  const { sections } = useSections();
  const { categories } = useCategories();

  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const toggleOpen = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  return (
    <div>
      <h2
        className="w-fit cursor-pointer text-xl font-bold underline"
        onClick={() => router.push("/lessons")}
      >
        Lessons
      </h2>
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
