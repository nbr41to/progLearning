import useSWR from "swr";

export const useCategories = () => {
  const { data, error } = useSWR<LessonCategory[]>(
    "/lessons/categories",
    null,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { categories: data || [], error };
};
