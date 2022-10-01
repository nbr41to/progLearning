import type { FC } from 'react';

import { Button } from '@mantine/core';
import { useState } from 'react';

type Props = {
  onClick: () => Promise<void>;
};

export const AttendButton: FC<Props> = ({ onClick }) => {
  const [attendIsLoading, setAttendIsLoading] = useState(false);

  return (
    <Button
      loading={attendIsLoading}
      fullWidth
      onClick={async () => {
        try {
          setAttendIsLoading(true);
          await onClick();
        } catch (error) {
          /* Error */
        } finally {
          setAttendIsLoading(false);
        }
      }}
    >
      出席！
    </Button>
  );
};
