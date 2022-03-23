import useSWR from "swr";

/* すべてのモーダルの状態を管理 */
export const useModal = (key: string) => {
  const { data: isOpen, mutate: setOpen } = useSWR<boolean | null>(
    `no-fetch/modals/${key}`
  );

  return { isOpen, setOpen };
};
