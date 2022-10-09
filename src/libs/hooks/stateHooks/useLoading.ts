import { useStaticSWR } from './useStaticSWR';

/* Loading状態を管理するHook */
export const useLoading = (): [
  boolean,
  (newData: boolean) => Promise<void>
] => {
  const { data, mutate } = useStaticSWR<boolean>('/loadingState', false);

  return [
    data || false,
    async (newData: boolean) => {
      await mutate(newData);
    },
  ];
};
