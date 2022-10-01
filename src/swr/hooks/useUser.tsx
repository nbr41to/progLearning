import type { User } from 'src/types';

import { closeAllModals, openModal } from '@mantine/modals';
import { useCallback, useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { AttendButton } from '@/components/ui/AttendButton';

import { dateFormatted } from 'src/libs/dateFormatted';
import { attend } from 'src/libs/frontend/prisma/user';

import { axiosGetFetcher } from './axiosFetcher';
import { useAuth } from './useAuth';
import { useCommits } from './useCommits';

export const useUser = () => {
  const user = useAuth();
  const { refetch: refetchPixels } = useCommits();

  const { data, error, mutate } = useSWR<User>(
    'users/me/',
    user ? (url) => axiosGetFetcher(url, user?.uid) : null,
    {}
  );

  const refetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const isTodayAttended = useMemo(() => {
    if (!data) return true;

    return (
      data.lastAttendedAt &&
      dateFormatted({ date: data.lastAttendedAt, format: 'YYYY-MM-DD' }) ===
        dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' })
    );
  }, [data]);

  useEffect(() => {
    if (!isTodayAttended) {
      openModal({
        title: `今日は${dateFormatted({
          date: new Date(),
          format: 'YYYY年MM月DD日',
        })}ですね😆`,
        children: (
          <div className="flex justify-center">
            <AttendButton
              onClick={async () => {
                if (!data) return;
                await attend(data);
                await refetch();
                await refetchPixels();
                closeAllModals();
              }}
            />
          </div>
        ),
        onClose: () => {
          closeAllModals();
        },
      });
    }
  }, [isTodayAttended, data, refetch, refetchPixels]);

  useEffect(() => {
    mutate();
  }, [user, mutate]);

  return { user: data, error, isLoading: typeof data === 'undefined', refetch };
};
