import useSWR from "swr";

export const useSections = () => {
  const { data, error } = useSWR<LessonSection[]>("/lessons/sections", null, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { sections: data || [], error };
};
